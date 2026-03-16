import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPublicCard } from "../lib/api";
function PublicCardPage() {
    const { slug = "" } = useParams();
    const [payload, setPayload] = useState(null);
    const [error, setError] = useState("");
    useEffect(() => {
        const load = async () => {
            try {
                const result = await fetchPublicCard(slug);
                setPayload(result);
            }
            catch (loadError) {
                setError(loadError instanceof Error ? loadError.message : "Unable to load card.");
            }
        };
        load().catch(() => setError("Unable to load card."));
    }, [slug]);
    if (error) {
        return _jsx("main", { className: "container", children: _jsx("p", { style: { color: "#9e2a2b" }, children: error }) });
    }
    if (!payload) {
        return _jsx("main", { className: "container", children: _jsx("p", { children: "Loading card..." }) });
    }
    const { card, template, documents } = payload;
    return (_jsx("main", { className: "container", children: _jsxs("section", { className: "panel", children: [_jsx("h1", { children: card.title }), _jsx("p", { children: card.bio }), _jsxs("p", { children: [_jsx("strong", { children: "Template:" }), " ", template?.name ?? card.templateId] }), _jsx("h2", { children: "Links" }), _jsx("ul", { children: card.links.map((link) => (_jsx("li", { children: _jsx("a", { href: link, target: "_blank", rel: "noreferrer", children: link }) }, link))) }), _jsx("h2", { children: "Documents" }), documents.length === 0 ? _jsx("p", { className: "muted", children: "No documents uploaded yet." }) : (_jsx("ul", { children: documents.map((document) => (_jsx("li", { children: _jsx("a", { href: document.url, children: document.filename }) }, document.id))) }))] }) }));
}
export { PublicCardPage };
