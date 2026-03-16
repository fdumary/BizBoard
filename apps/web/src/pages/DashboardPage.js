import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { createCard, fetchCards, fetchTemplates } from "../lib/api";
function DashboardPage() {
    const [cards, setCards] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("My Business Card");
    const [bio, setBio] = useState("Add your professional summary.");
    const [links, setLinks] = useState("https://portfolio.example.com");
    const [templateId, setTemplateId] = useState("classic");
    useEffect(() => {
        const run = async () => {
            try {
                const [cardResponse, templateResponse] = await Promise.all([fetchCards(), fetchTemplates()]);
                setCards(cardResponse.cards);
                setTemplates(templateResponse.templates);
            }
            catch (loadError) {
                setError(loadError instanceof Error ? loadError.message : "Failed to load dashboard.");
            }
            finally {
                setLoading(false);
            }
        };
        run().catch(() => {
            setError("Unexpected load error.");
            setLoading(false);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        setError("");
        try {
            const response = await createCard({
                title,
                bio,
                links: links.split(",").map((item) => item.trim()).filter(Boolean),
                templateId
            });
            setCards((current) => [response.card, ...current]);
            setTitle("New Card");
        }
        catch (submissionError) {
            setError(submissionError instanceof Error ? submissionError.message : "Unable to create card.");
        }
    };
    if (loading) {
        return _jsx("main", { className: "container", children: _jsx("p", { children: "Loading dashboard..." }) });
    }
    return (_jsxs("main", { className: "container grid", style: { gap: "1.2rem" }, children: [_jsxs("section", { className: "panel", children: [_jsx("h1", { children: "BizBoard Dashboard" }), _jsx("p", { className: "muted", children: "Create your public profile card, then share it as a URL or QR code." })] }), _jsxs("section", { className: "panel", children: [_jsx("h2", { children: "Create card" }), _jsxs("form", { onSubmit: onSubmit, className: "grid grid-2", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "title", children: "Title" }), _jsx("input", { id: "title", value: title, onChange: (event) => setTitle(event.target.value), required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "template", children: "Template" }), _jsx("select", { id: "template", value: templateId, onChange: (event) => setTemplateId(event.target.value), children: templates.map((template) => (_jsx("option", { value: template.id, children: template.name }, template.id))) })] }), _jsxs("div", { style: { gridColumn: "1 / -1" }, children: [_jsx("label", { htmlFor: "bio", children: "Bio" }), _jsx("textarea", { id: "bio", value: bio, onChange: (event) => setBio(event.target.value), rows: 3 })] }), _jsxs("div", { style: { gridColumn: "1 / -1" }, children: [_jsx("label", { htmlFor: "links", children: "Links (comma separated)" }), _jsx("input", { id: "links", value: links, onChange: (event) => setLinks(event.target.value) })] }), _jsx("div", { style: { gridColumn: "1 / -1" }, children: _jsx("button", { type: "submit", children: "Save card" }) })] }), error && _jsx("p", { style: { color: "#9e2a2b" }, children: error })] }), _jsxs("section", { className: "panel", children: [_jsx("h2", { children: "Your cards" }), cards.length === 0 ? _jsx("p", { className: "muted", children: "No cards yet." }) : (_jsx("div", { className: "grid", children: cards.map((card) => (_jsxs("article", { className: "card", children: [_jsx("h3", { children: card.title }), _jsx("p", { children: card.bio }), _jsxs("div", { children: [_jsxs("span", { className: "tag", children: ["Template: ", card.templateId] }), _jsx("a", { href: `/public/${card.urlSlug}`, children: "Open public card" })] })] }, card.id))) }))] })] }));
}
export { DashboardPage };
