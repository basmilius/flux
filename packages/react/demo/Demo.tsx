import { useState } from "react";
import { FluxAiConversation, FluxAiMessage, FluxAiStreamingText, FluxBadge, FluxFormCheckbox, FluxFormField, FluxFormInput, FluxFormRating, FluxNotice, FluxPrimaryButton, FluxProgressBar, FluxRoot, FluxSecondaryButton, FluxStatisticsChange, FluxStatisticsKpi, FluxStatisticsPercentageBar, showConfirm, showSnackbar } from "../dist/index.js";

const packages = [
    ["Core", "208 components", "Forms, navigation, overlays, tables and utilities"],
    ["Application", "15 components", "Shell, menus, status pages and route contexts"],
    ["AI", "11 components", "Conversation, Markdown, tools and token usage"],
    ["Flow", "21 components", "Nodes, edges, viewport, routing and layout"],
    ["Statistics", "39 components", "ECharts, KPIs, trackers and converters"],
    ["Visuals", "16 components", "Highlights, effects, patterns and animation"],
] as const;

export function Demo() {
    const [name, setName] = useState("Timo");
    const [enabled, setEnabled] = useState(true);
    const [rating, setRating] = useState(4);

    async function runDialog() {
        const accepted = await showConfirm({
            title: "Native React dialog",
            message: "This dialog is driven by the shared Flux store and rendered by FluxRoot.",
        });
        void showSnackbar({
            color: accepted ? "success" : "gray",
            duration: 3000,
            isCloseable: true,
            message: accepted ? "React interaction confirmed" : "Dialog cancelled",
        });
    }

    return (
        <FluxRoot className="demo-root">
            <header className="topbar">
                <a className="brand" href="/" aria-label="Flux home">
                    <span className="brand-mark">F</span>
                    <span>Flux</span>
                    <span className="react-pill">React</span>
                </a>
                <nav aria-label="Showcase sections">
                    <a href="#packages">Packages</a>
                    <a href="#components">Components</a>
                    <a href="#architecture">Architecture</a>
                    <a href="/guide/introduction/react">Docs</a>
                </nav>
                <a className="github-link" href="https://github.com/TimoBlinqx/flux-react/pull/1" target="_blank" rel="noreferrer">
                    PR #1 ↗
                </a>
            </header>

            <main id="top">
                <section className="hero">
                    <div className="hero-copy">
                        <div className="eyebrow">
                            <span /> Native React port complete
                        </div>
                        <h1>
                            One design system.
                            <br />
                            <em>Two native runtimes.</em>
                        </h1>
                        <p>The existing Vue implementation stays intact. A separate React package now exposes the same Flux component families, utilities, types, and visual language without a Vue runtime dependency.</p>
                        <div className="hero-actions">
                            <FluxPrimaryButton label="Try the React dialog" onClick={() => void runDialog()} />
                            <FluxSecondaryButton label="Browse components" type="link" href="#components" />
                        </div>
                        <div className="verification">
                            <span>
                                <b>850</b> upstream exports covered
                            </span>
                            <span>
                                <b>81</b> tests passing
                            </span>
                            <span>
                                <b>0</b> Vue runtime imports
                            </span>
                        </div>
                    </div>
                    <div className="hero-visual" aria-label="Vue and React package relationship">
                        <div className="orbit orbit-one" />
                        <div className="orbit orbit-two" />
                        <div className="runtime vue-runtime">
                            <span>V</span>
                            <strong>Vue</strong>
                            <small>existing</small>
                        </div>
                        <div className="runtime react-runtime">
                            <span>R</span>
                            <strong>React</strong>
                            <small>native</small>
                        </div>
                        <div className="flux-core">
                            <span>F</span>
                            <strong>Flux UI</strong>
                            <small>tokens + styles</small>
                        </div>
                    </div>
                </section>

                <section id="packages" className="section">
                    <div className="section-heading">
                        <div>
                            <span className="kicker">The port</span>
                            <h2>Every package family, side by side</h2>
                        </div>
                        <p>The React entry point combines the public surface of eight Flux packages while the original Vue packages remain independently usable.</p>
                    </div>
                    <div className="package-grid">
                        {packages.map(([title, count, description], index) => (
                            <article className="package-card" key={title}>
                                <span className={`package-number tone-${index + 1}`}>{String(index + 1).padStart(2, "0")}</span>
                                <div>
                                    <h3>{title}</h3>
                                    <strong>{count}</strong>
                                    <p>{description}</p>
                                </div>
                                <FluxBadge color={index % 3 === 0 ? "primary" : index % 3 === 1 ? "info" : "success"} label="Ported" />
                            </article>
                        ))}
                    </div>
                </section>

                <section id="components" className="section component-section">
                    <div className="section-heading">
                        <div>
                            <span className="kicker">Live components</span>
                            <h2>Rendered from the React package</h2>
                        </div>
                        <p>These are the ported Flux components—not static mockups. Change values, open the dialog, or trigger a notification.</p>
                    </div>

                    <div className="demo-grid">
                        <article className="demo-panel form-panel">
                            <div className="panel-title">
                                <span>Core / Forms</span>
                                <FluxBadge color="success" label="Interactive" />
                            </div>
                            <FluxFormField label="Display name" hint="Controlled with React state">
                                <FluxFormInput value={name} onValueChange={(value) => setName(String(value ?? ""))} />
                            </FluxFormField>
                            <FluxFormCheckbox checked={enabled} label="Enable notifications" subLabel="Uses onCheckedChange" onCheckedChange={setEnabled} />
                            <FluxFormField label="Port quality">
                                <FluxFormRating value={rating} onValueChange={setRating} />
                            </FluxFormField>
                            <FluxProgressBar max={5} value={rating} status={`${rating} of 5`} />
                            <div className="inline-actions">
                                <FluxPrimaryButton label={`Save ${name || "profile"}`} onClick={() => enabled && void showSnackbar({ color: "success", duration: 3000, isCloseable: true, message: `${name || "Profile"} saved` })} />
                                <FluxSecondaryButton label="Open dialog" onClick={() => void runDialog()} />
                            </div>
                        </article>

                        <article className="demo-panel stats-panel">
                            <div className="panel-title">
                                <span>Statistics</span>
                                <FluxBadge color="info" label="ECharts ready" />
                            </div>
                            <div className="kpi-row">
                                <FluxStatisticsKpi title="API parity" value="100%" change={{ color: "success", value: "+850" }} />
                                <FluxStatisticsKpi title="Tests" value="81" change={{ color: "success", value: "Passing" }} />
                            </div>
                            <div className="distribution-title">
                                <span>Port distribution</span>
                                <FluxStatisticsChange color="success" value="Complete" />
                            </div>
                            <FluxStatisticsPercentageBar
                                items={[
                                    { label: "Core", value: 55, color: "primary" },
                                    { label: "Statistics", value: 18, color: "info" },
                                    { label: "Flow", value: 12, color: "success" },
                                    { label: "Other", value: 15, color: "warning" },
                                ]}
                            />
                        </article>

                        <article className="demo-panel ai-panel">
                            <div className="panel-title">
                                <span>AI</span>
                                <FluxBadge color="primary" label="Markdown" />
                            </div>
                            <FluxAiConversation isSticky={false}>
                                <FluxAiMessage role="user" author="You" when="Now">
                                    How was Flux ported?
                                </FluxAiMessage>
                                <FluxAiMessage role="assistant" author="Flux React" when="Now">
                                    <FluxAiStreamingText content={"The **Vue packages remain unchanged** while native React components reuse the same design tokens and Sass modules. Public APIs are checked automatically."} />
                                </FluxAiMessage>
                            </FluxAiConversation>
                        </article>

                        <article className="demo-panel release-panel">
                            <div className="panel-title">
                                <span>Release status</span>
                                <FluxBadge color="success" label="CI green" />
                            </div>
                            <FluxNotice color="success" title="React build verified" message="Types, tests, bundles and public exports pass locally and in GitHub Actions." />
                            <ol className="check-list">
                                <li>
                                    <span>1</span>
                                    <div>
                                        <b>Native components</b>
                                        <small>React state, events and lifecycle</small>
                                    </div>
                                    <i>✓</i>
                                </li>
                                <li>
                                    <span>2</span>
                                    <div>
                                        <b>Shared visual system</b>
                                        <small>Flux tokens and component styles</small>
                                    </div>
                                    <i>✓</i>
                                </li>
                                <li>
                                    <span>3</span>
                                    <div>
                                        <b>Compatibility surface</b>
                                        <small>Hooks, utilities, types and stores</small>
                                    </div>
                                    <i>✓</i>
                                </li>
                            </ol>
                        </article>
                    </div>
                </section>

                <section id="architecture" className="section architecture-section">
                    <div className="section-heading">
                        <div>
                            <span className="kicker">Repository layout</span>
                            <h2>Alongside Vue, not on top of it</h2>
                        </div>
                    </div>
                    <div className="architecture-card">
                        <div className="tree" aria-label="Repository package tree">
                            <div>
                                <span>flux-react/</span>
                            </div>
                            <div className="tree-line">
                                <span>├─ packages/components</span>
                                <small>Vue · unchanged</small>
                            </div>
                            <div className="tree-line">
                                <span>├─ packages/application</span>
                                <small>Vue · unchanged</small>
                            </div>
                            <div className="tree-line">
                                <span>├─ packages/ai · flow · statistics · visuals</span>
                                <small>Vue · unchanged</small>
                            </div>
                            <div className="tree-line highlighted">
                                <span>└─ packages/react</span>
                                <small>React · new</small>
                            </div>
                        </div>
                        <div className="architecture-copy">
                            <h3>A true framework port</h3>
                            <p>React owns rendering, state, contexts, refs, portals, keyboard interaction, and effects. Only framework-neutral assets—the design tokens, Sass modules, geometry, and data contracts—are shared.</p>
                            <div className="chips">
                                <span>React 19</span>
                                <span>TypeScript</span>
                                <span>Vite</span>
                                <span>Vitest</span>
                                <span>ECharts</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <span>Flux UI React port</span>
                <span>feat/react-components · PR #1</span>
            </footer>
        </FluxRoot>
    );
}
