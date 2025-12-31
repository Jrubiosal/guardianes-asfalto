import { useState, useMemo, useEffect } from 'react';
import { translations, getCategoryMap } from './lib/translations';
import { initialRoutes } from './data/routes';
import { initAuth, subscribeToAuthChanges, subscribeToUserRoutes, addRoute, deleteRoute } from './lib/firebase';
import { initAuth, subscribeToAuthChanges, subscribeToUserRoutes, addRoute, deleteRoute } from './lib/firebase';

import Header from './components/Header';
import Stats from './components/Stats';
import RouteCard from './components/RouteCard';
import BottomNav from './components/BottomNav';
import RouteDetail from './components/RouteDetail';
import AddRouteForm from './components/AddRouteForm';

export default function App() {
    const [lang, setLang] = useState('ca');
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const [userRoutes, setUserRoutes] = useState([]);
    const [viewingRoute, setViewingRoute] = useState(null);
    const [activeTab, setActiveTab] = useState('home');

    // New route form
    const [newRouteForm, setNewRouteForm] = useState({
        title: "", link: "", category: "Curvas", desc: "", dist: "", time: ""
    });

    const t = translations[lang];
    const catMap = getCategoryMap(t);

    const allRoutes = useMemo(() => [...initialRoutes, ...userRoutes], [userRoutes]);

    // Initialize Auth
    useEffect(() => {
        initAuth();
        const unsubscribe = subscribeToAuthChanges(setUser);
        return () => unsubscribe();
    }, []);

    // Sync with Firestore
    useEffect(() => {
        if (!user) return;
        const unsubscribe = subscribeToUserRoutes(setUserRoutes);
        return () => unsubscribe();
    }, [user]);

    // Lock body scroll when modals are open
    useEffect(() => {
        if (viewingRoute) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [viewingRoute]);



    const handleSaveRoute = async () => {
        if (!newRouteForm.title || !newRouteForm.link || !user) return;

        setAiLoading(true);
        const newRoute = {
            title: newRouteForm.title,
            link: newRouteForm.link,
            category: newRouteForm.category,
            desc: newRouteForm.desc,
            dist: Number(newRouteForm.dist) || 0,
            time: newRouteForm.time
        };

        try {
            await addRoute(newRoute, user.uid);
            setNewRouteForm({ title: "", link: "", category: "Curvas", desc: "", dist: "", time: "" });
            setActiveTab('home');
        } catch (error) {
            console.error("Error saving route:", error);
        }
    };

    const handleDeleteRoute = async (routeId) => {
        if (!window.confirm(t.confirmBorrar)) return;
        try {
            await deleteRoute(routeId);
            setViewingRoute(null);
        } catch (error) {
            console.error("Error deleting route:", error);
        }
    };

    const filteredRoutes = useMemo(() => {
        return allRoutes.filter(route => {
            const matchesSearch = route.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                route.desc.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "Todas" || route.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory, allRoutes]);

    const totalKm = useMemo(() =>
        Math.round(allRoutes.reduce((acc, r) => acc + (r.dist || 0), 0)),
        [allRoutes]
    );

    return (
        <div className="min-h-screen bg-[#0f1115] text-slate-100 font-sans pb-24 select-none text-left">
            <Header
                t={t}
                lang={lang}
                setLang={setLang}
                user={user}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                activeTab={activeTab}
            />

            <main className="p-4 space-y-6">
                {activeTab === 'home' && (
                    <>


                        <Stats
                            t={t}
                            allRoutes={allRoutes}
                            userRoutes={userRoutes}
                            totalKm={totalKm}
                        />

                        {/* Routes List */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <h2 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em]">
                                    {selectedCategory === "Todas" ? t.roadbook : `${t.filtro}: ${catMap[selectedCategory]}`}
                                </h2>
                                <span className="text-[10px] font-bold text-orange-500/50">
                                    {filteredRoutes.length} {t.rutas}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredRoutes.map((route) => (
                                    <RouteCard
                                        key={route.id}
                                        route={route}
                                        onClick={() => setViewingRoute(route)}
                                    />
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {activeTab === 'add' && (
                    <AddRouteForm
                        t={t}
                        user={user}
                        newRouteForm={newRouteForm}
                        setNewRouteForm={setNewRouteForm}
                        onSave={handleSaveRoute}
                    />
                )}
            </main>

            <BottomNav
                t={t}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />



            <RouteDetail
                t={t}
                route={viewingRoute}
                onClose={() => setViewingRoute(null)}
                onDelete={handleDeleteRoute}
            />
        </div>
    );
}
