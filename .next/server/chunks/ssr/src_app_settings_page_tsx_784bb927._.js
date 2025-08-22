module.exports = {

"[project]/src/app/settings/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>ConfiguracoesPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ConfiguracoesPage() {
    const [notificacoes, setNotificacoes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [tema, setTema] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("claro");
    const [fotoPerfil, setFotoPerfil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [previewFoto, setPreviewFoto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fotoUrlAtual, setFotoUrlAtual] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // Efeito para carregar as configurações do usuário ao montar o componente
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchUserSettings = async ()=>{
            setIsLoading(true);
            setMessage("");
            const apiUrl = ("TURBOPACK compile-time value", "http://localhost:5000");
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const token = localStorage.getItem("authToken");
            if (!token) {
                setMessage("Usuário não autenticado. Faça o login para ver suas configurações.");
                setIsLoading(false);
                return;
            }
            try {
                const res = await fetch(`${apiUrl}/api/user/settings`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || "Erro ao carregar configurações");
                }
                const data = await res.json();
                setNotificacoes(data.user.notifications);
                setTema(data.user.theme);
                setFotoUrlAtual(data.user.profilePicUrl);
                setMessage("Configurações carregadas!");
            } catch (err) {
                setMessage(`Erro ao carregar configurações: ${err.message}`);
            } finally{
                setIsLoading(false);
            }
        };
        fetchUserSettings();
    }, []);
    const handleFotoChange = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            setFotoPerfil(file);
            setPreviewFoto(URL.createObjectURL(file));
        }
    };
    const handleSalvar = async ()=>{
        setIsLoading(true);
        setMessage("");
        let finalFotoUrl = fotoUrlAtual;
        // Se uma nova foto foi selecionada, faz o upload primeiro
        if (fotoPerfil) {
            const formData = new FormData();
            formData.append("foto", fotoPerfil);
            const apiUrl = ("TURBOPACK compile-time value", "http://localhost:5000");
            try {
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                // CORREÇÃO: Adicionar '/api' à URL de upload
                const res = await fetch(`${apiUrl}/api/uploadProfilePic`, {
                    method: "POST",
                    body: formData
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || "Erro ao enviar a foto");
                }
                const data = await res.json();
                finalFotoUrl = data.path; // URL da nova imagem
            } catch (err) {
                setMessage(`Erro no upload: ${err.message}`);
                setIsLoading(false);
                return;
            }
        }
        // Envia todas as configurações para o backend
        try {
            const apiUrl = ("TURBOPACK compile-time value", "http://localhost:5000");
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const token = localStorage.getItem("authToken");
            if (!token) {
                setMessage("Usuário não autenticado. Faça o login novamente.");
                setIsLoading(false);
                return;
            }
            const settingsData = {
                theme: tema,
                notifications: notificacoes,
                profilePicUrl: finalFotoUrl
            };
            const res = await fetch(`${apiUrl}/api/user/settings`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(settingsData)
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Erro ao salvar configurações");
            }
            const updatedData = await res.json();
            setFotoUrlAtual(updatedData.user.profilePicUrl);
            setMessage("Configurações salvas com sucesso!");
        } catch (err) {
            setMessage(`Falha ao salvar: ${err.message}`);
        } finally{
            setIsLoading(false);
        }
    };
    const handleApagarConta = ()=>{
        // Substituir alert/confirm por um modal customizado para melhor UX
        if (window.confirm("Tem certeza que deseja apagar sua conta? Esta ação é irreversível.")) {
            window.alert("Conta apagada!");
        // Chamada para a API de deletar a conta
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto p-6 mt-10 rounded-2xl shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-6",
                children: "Configurações"
            }, void 0, false, {
                fileName: "[project]/src/app/settings/page.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `p-3 mb-4 rounded-lg ${message.includes('Erro') || message.includes('Falha') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`,
                children: message
            }, void 0, false, {
                fileName: "[project]/src/app/settings/page.tsx",
                lineNumber: 160,
                columnNumber: 9
            }, this),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-blue-500 text-center",
                children: "Carregando..."
            }, void 0, false, {
                fileName: "[project]/src/app/settings/page.tsx",
                lineNumber: 165,
                columnNumber: 21
            }, this),
            !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Notificações"
                            }, void 0, false, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 171,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: notificacoes,
                                onChange: (e)=>setNotificacoes(e.target.checked),
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/settings/page.tsx",
                        lineNumber: 170,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block mb-1 font-medium",
                                children: "Tema"
                            }, void 0, false, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: tema,
                                onChange: (e)=>setTema(e.target.value),
                                className: "w-full p-2 border rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "claro",
                                        children: "Claro"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/settings/page.tsx",
                                        lineNumber: 188,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "escuro",
                                        children: "Escuro"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/settings/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/settings/page.tsx",
                        lineNumber: 181,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block mb-1 font-medium",
                                children: "Foto do Perfil"
                            }, void 0, false, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 195,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                accept: "image/*",
                                onChange: handleFotoChange,
                                className: "w-full p-2 border rounded-lg"
                            }, void 0, false, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this),
                            (previewFoto || fotoUrlAtual) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: previewFoto || fotoUrlAtual || '',
                                alt: "Prévia da foto do perfil",
                                className: "mt-2 w-32 h-32 object-cover rounded-full border"
                            }, void 0, false, {
                                fileName: "[project]/src/app/settings/page.tsx",
                                lineNumber: 203,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/settings/page.tsx",
                        lineNumber: 194,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSalvar,
                        className: "mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700",
                        children: "Salvar Alterações"
                    }, void 0, false, {
                        fileName: "[project]/src/app/settings/page.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleApagarConta,
                        className: "mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700",
                        children: "Apagar Conta"
                    }, void 0, false, {
                        fileName: "[project]/src/app/settings/page.tsx",
                        lineNumber: 220,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/settings/page.tsx",
                lineNumber: 168,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/settings/page.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
}),

};

//# sourceMappingURL=src_app_settings_page_tsx_784bb927._.js.map