// import pluginCenter from "./pluginCenter";

window.MathJax = {
    tex: {
        inlineMath: [["$", "$"]],
        displayMath: [["$$", "$$"]],
        tags: "ams",
    },
    svg: {
        fontCache: "none",
    },
    options: {
        renderActions: {
            addMenu: [0, "", ""],
            addContainer: [
                190,
                (doc) => {
                    for (const math of doc.math) {
                        addContainer(math, doc);
                    }
                },
                addContainer,
            ],
        },
    },
};
// pluginCenter.mathjax = true;

// import "mathjax/es5/tex-svg-full"; // 使用 tex-svg.js

const MJX_DATA_FORMULA = "data-formula";
const MJX_DATA_FORMULA_TYPE = "data-formula-type";

function addContainer(math, doc) {
    const tag = "span";
    const spanClass = math.display ? "span-block-equation" : "span-inline-equation";
    const cls = math.display ? "block-equation" : "inline-equation";
    math.typesetRoot.className = cls;
    math.typesetRoot.setAttribute(MJX_DATA_FORMULA, math.math);
    math.typesetRoot.setAttribute(MJX_DATA_FORMULA_TYPE, cls);
    math.typesetRoot = doc.adaptor.node(tag, { class: spanClass, style: "cursor:pointer" }, [math.typesetRoot]);
}