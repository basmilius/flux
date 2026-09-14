import { clsx } from 'clsx';
import { Lexer } from 'marked';
import type { Links, Token, Tokens } from 'marked';
import { Children, createContext, forwardRef, Fragment, isValidElement, useContext, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { ElementType, FormEvent, HTMLAttributes, KeyboardEvent, ReactElement, ReactNode } from 'react';
import type { FluxColor, FluxIconName, FluxStyle } from '../types';
import { FluxPrimaryButton, FluxSecondaryButton } from './Actions';
import { FluxActionStack } from './Composition';
import { FluxAvatar, FluxBadge } from './Display';
import { FluxBoxedIcon } from './DisplayExtended';
import { FluxExpandable } from './Disclosure';
import { FluxProgressBar, FluxSpinner } from './Feedback';
import { FluxHoverCard } from './Interactions';
import { FluxProse } from './Layout';
import { FluxMenu } from './Menus';
import { FluxFlyout } from './Overlays';
import { FluxIcon } from './Icon';
import citationStyles from '../../../ai/src/css/component/AiCitation.module.scss';
import codeStyles from '../../../ai/src/css/component/AiCodeBlock.module.scss';
import conversationStyles from '../../../ai/src/css/component/AiConversation.module.scss';
import messageStyles from '../../../ai/src/css/component/AiMessage.module.scss';
import modelStyles from '../../../ai/src/css/component/AiModelSelect.module.scss';
import promptStyles from '../../../ai/src/css/component/AiPromptInput.module.scss';
import reasoningStyles from '../../../ai/src/css/component/AiReasoning.module.scss';
import streamingStyles from '../../../ai/src/css/component/AiStreamingText.module.scss';
import suggestionStyles from '../../../ai/src/css/component/AiSuggestions.module.scss';
import toolStyles from '../../../ai/src/css/component/AiToolCall.module.scss';
import usageStyles from '../../../ai/src/css/component/AiUsage.module.scss';

export interface FluxAiStreamingConfig {
    fadeDuration: number;
    hasFade: boolean;
}
export interface FluxAiToolCallConfig {
    resultLimit: number;
}
export interface FluxAiConfig {
    streaming: FluxAiStreamingConfig;
    toolCall: FluxAiToolCallConfig;
}
export interface ConfigureAiOptions {
    streaming?: Partial<FluxAiStreamingConfig>;
    toolCall?: Partial<FluxAiToolCallConfig>;
}
export const aiConfig: FluxAiConfig = { streaming: { hasFade: true, fadeDuration: 300 }, toolCall: { resultLimit: 900 } };
export function configureAi(options: ConfigureAiOptions) {
    if (options.streaming) Object.assign(aiConfig.streaming, options.streaming);
    if (options.toolCall) Object.assign(aiConfig.toolCall, options.toolCall);
}

const markdownOptions = { breaks: true, gfm: true, silent: true } as const;
export interface LexMarkdownResult {
    links: Links;
    tokens: Token[];
}
export function lexMarkdown(source: string, links: Links = Object.create(null)): LexMarkdownResult {
    const lexer = new Lexer(markdownOptions);
    Object.assign(lexer.tokens.links, links);
    return { links: lexer.tokens.links, tokens: lexer.lex(source).slice() };
}
export function findBlockBoundary(source: string) {
    let boundary = 0,
        fence = '',
        index = 0,
        insideList = false,
        previousBlank = true;
    while (index < source.length) {
        const end = source.indexOf('\n', index),
            line = source.slice(index, end === -1 ? source.length : end),
            blank = line.trim().length === 0;
        if (fence) {
            if (line.trimStart().startsWith(fence)) fence = '';
            previousBlank = false;
        } else {
            if (previousBlank && !blank && !/^[ \t]/.test(line)) {
                const marker = /^(?:[-*+]|\d{1,9}[.)])(?:[ \t]|$)/.test(line);
                if (index > 0 && !(marker && insideList)) boundary = index;
                insideList = marker;
            }
            const opening = /^ {0,3}(`{3,}|~{3,})/.exec(line);
            fence = opening?.[1] ?? '';
            previousBlank = blank;
        }
        if (end === -1) break;
        index = end + 1;
    }
    return boundary;
}
export function repairStreamingTail(source: string) {
    if (!source || hasOpenFence(source)) return source;
    const start = source.lastIndexOf('\n') + 1,
        line = source.slice(start);
    if (/^(?: {4}|\t)/.test(line)) return source;
    let value = line;
    const bracket = value.lastIndexOf('[');
    if (bracket >= 0 && value.indexOf(']', bracket) < 0) value = value.slice(0, value[bracket - 1] === '!' ? bracket - 1 : bracket);
    else {
        const link = value.lastIndexOf('](');
        if (link >= 0 && value.indexOf(')', link) < 0) value = value.slice(0, value.lastIndexOf('[', link));
    }
    for (const delimiter of ['`', '**', '__', '~~', '*', '_']) {
        const escaped = value.replaceAll(`\\${delimiter}`, '');
        const count = escaped.split(delimiter).length - 1;
        if (count % 2) value += delimiter;
    }
    return source.slice(0, start) + value;
}
function hasOpenFence(source: string) {
    let fence = '';
    for (const line of source.split('\n')) {
        if (fence) {
            if (line.trimStart().startsWith(fence)) fence = '';
        } else fence = /^ {0,3}(`{3}|~{3})/.exec(line)?.[1] ?? '';
    }
    return Boolean(fence);
}
export interface MarkdownCodeProps {
    code: string;
    language?: string;
}
export interface WordFade {
    fadeClass: string | null;
    wordIndex: number;
}
export interface MarkdownContext extends WordFade {
    renderCode(props: MarkdownCodeProps): ReactNode;
}
export type MarkdownChild = ReactNode;
const externalUrl = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function safeUrl(value: string, image = false) {
    const trimmed = value.trim();
    if (/^(?:javascript|vbscript):/i.test(trimmed) || (!image && /^data:/i.test(trimmed)) || (image && /^data:(?!image\/)/i.test(trimmed))) return null;
    return trimmed;
}
export function renderText(text: string, fade: WordFade): ReactNode[] {
    if (!fade.fadeClass) return [text];
    return (text.match(/\s*\S+|\s+/g) ?? []).map((word) => (
        <span key={`word-${fade.wordIndex++}`} className={fade.fadeClass!}>
            {word}
        </span>
    ));
}
function inline(tokens: Token[], context: MarkdownContext): ReactNode[] {
    return tokens.flatMap((token, key): ReactNode[] => {
        switch (token.type) {
            case 'br':
                return [<br key={key} />];
            case 'codespan':
                return [<code key={key}>{(token as Tokens.Codespan).text}</code>];
            case 'del':
                return [<del key={key}>{inline((token as Tokens.Del).tokens, context)}</del>];
            case 'em':
                return [<em key={key}>{inline((token as Tokens.Em).tokens, context)}</em>];
            case 'strong':
                return [<strong key={key}>{inline((token as Tokens.Strong).tokens, context)}</strong>];
            case 'link': {
                const link = token as Tokens.Link,
                    href = safeUrl(link.href);
                if (!href) return inline(link.tokens, context);
                return [
                    <a key={key} href={href} rel={externalUrl.test(href) ? 'noopener noreferrer nofollow' : undefined} target={externalUrl.test(href) ? '_blank' : undefined}>
                        {inline(link.tokens, context)}
                    </a>,
                ];
            }
            case 'image': {
                const image = token as Tokens.Image,
                    src = safeUrl(image.href, true);
                return src ? [<img key={key} src={src} alt={image.text} loading="lazy" referrerPolicy="no-referrer" />] : [image.text];
            }
            case 'html':
                return renderText((token as Tokens.Tag).text, context);
            case 'text': {
                const text = token as Tokens.Text;
                return text.tokens ? inline(text.tokens, context) : renderText(text.text, context);
            }
            default:
                return renderText(token.raw, context);
        }
    });
}
function blocks(tokens: Token[], context: MarkdownContext, offset = 0): ReactNode[] {
    return tokens.flatMap((token, index): ReactNode[] => {
        const key = offset + index;
        switch (token.type) {
            case 'blockquote':
                return [<blockquote key={key}>{blocks((token as Tokens.Blockquote).tokens, context)}</blockquote>];
            case 'code': {
                const code = token as Tokens.Code;
                return [<span key={key}>{context.renderCode({ code: code.text, language: code.lang?.trim().split(/\s+/)[0] })}</span>];
            }
            case 'heading': {
                const heading = token as Tokens.Heading,
                    Tag = `h${Math.min(6, Math.max(1, heading.depth))}` as ElementType;
                return [<Tag key={key}>{inline(heading.tokens, context)}</Tag>];
            }
            case 'hr':
                return [<hr key={key} />];
            case 'html':
                return [<p key={key}>{renderText((token as Tokens.HTML).text, context)}</p>];
            case 'list': {
                const list = token as Tokens.List,
                    Tag = list.ordered ? 'ol' : 'ul';
                return [
                    <Tag key={key} start={list.ordered && list.start !== 1 && list.start !== '' ? Number(list.start) : undefined}>
                        {list.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{blocks(item.tokens, context)}</li>
                        ))}
                    </Tag>,
                ];
            }
            case 'paragraph':
                return [<p key={key}>{inline((token as Tokens.Paragraph).tokens, context)}</p>];
            case 'table': {
                const table = token as Tokens.Table;
                return [
                    <table key={key}>
                        <thead>
                            <tr>
                                {table.header.map((cell, cellIndex) => (
                                    <th key={cellIndex} style={{ textAlign: cell.align ?? undefined }}>
                                        {inline(cell.tokens, context)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {table.rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} style={{ textAlign: cell.align ?? undefined }}>
                                            {inline(cell.tokens, context)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>,
                ];
            }
            case 'text': {
                const text = token as Tokens.Text;
                return [<p key={key}>{text.tokens ? inline(text.tokens, context) : renderText(text.text, context)}</p>];
            }
            default:
                return [];
        }
    });
}
export function renderMarkdown(tokens: Token[], context: MarkdownContext, keyOffset = 0) {
    return blocks(tokens, context, keyOffset);
}
export interface UseStreamingMarkdownOptions {
    content: string;
    fadeClass?: string | null;
    isStreaming?: boolean;
    renderCode(props: MarkdownCodeProps): ReactNode;
}
export interface UseStreamingMarkdownReturn {
    readonly nodes: ReactNode[];
}
export function useStreamingMarkdown({ content, fadeClass, isStreaming, renderCode }: UseStreamingMarkdownOptions): UseStreamingMarkdownReturn {
    const nodes = useMemo(() => {
        const source = isStreaming ? repairStreamingTail(content.replace(/\r\n?/g, '\n')) : content;
        return renderMarkdown(lexMarkdown(source).tokens, { fadeClass: isStreaming ? (fadeClass ?? null) : null, renderCode, wordIndex: 0 });
    }, [content, fadeClass, isStreaming, renderCode]);
    return { nodes };
}

export function FluxAiCitation({ children, excerpt, index, title, url }: { children?: (state: { close(): void }) => ReactNode; excerpt?: string; index: number; title?: string; url?: string }) {
    const id = useId(),
        description = [title, excerpt].filter(Boolean).join('. '),
        label = `Source ${index}`;
    return (
        <FluxHoverCard
            label={label}
            opener={({ close, isOpen, open }) => (
                <>
                    <button className={citationStyles.aiCitationMarker} type="button" aria-describedby={description ? id : undefined} aria-expanded={isOpen} aria-label={label} onClick={() => (isOpen ? close() : open())}>
                        {index}
                    </button>
                    {description && (
                        <span id={id} className={citationStyles.aiCitationDescription}>
                            {description}
                        </span>
                    )}
                </>
            )}
        >
            {({ close }) =>
                children?.({ close }) ?? (
                    <>
                        {url ? (
                            <a className={citationStyles.aiCitationTitle} href={safeUrl(url) ?? undefined} rel="noopener noreferrer" target="_blank">
                                <span>{title ?? url}</span>
                                <FluxIcon name="arrow-up-right-from-square" size={12} />
                            </a>
                        ) : (
                            title && <span className={citationStyles.aiCitationTitle}>{title}</span>
                        )}
                        {excerpt && <p className={citationStyles.aiCitationExcerpt}>{excerpt}</p>}
                    </>
                )
            }
        </FluxHoverCard>
    );
}
async function copy(value: string) {
    try {
        await navigator.clipboard.writeText(value);
        return true;
    } catch {
        return false;
    }
}
export function FluxAiCodeBlock({ code, language }: MarkdownCodeProps) {
    const [copied, setCopied] = useState(false),
        timer = useRef(0);
    useEffect(() => () => clearTimeout(timer.current), []);
    return (
        <div className={codeStyles.codeBlock}>
            <div className={codeStyles.codeBlockHeader}>
                <span className={codeStyles.codeBlockLanguage}>{language ?? 'Code'}</span>
                <button
                    className={codeStyles.codeBlockCopy}
                    type="button"
                    onClick={async () => {
                        if (await copy(code)) {
                            setCopied(true);
                            clearTimeout(timer.current);
                            timer.current = window.setTimeout(() => setCopied(false), 2100);
                        }
                    }}
                >
                    <FluxIcon name={copied ? 'check' : 'copy'} size={15} />
                    <span aria-live="polite">{copied ? 'Copied' : 'Copy code'}</span>
                </button>
            </div>
            <pre className={codeStyles.codeBlockContent}>
                <code>{code}</code>
            </pre>
        </div>
    );
}
export interface FluxAiConversationInjection {
    scrollToBottom(): void;
}
export const FluxAiConversationInjectionKey = createContext<FluxAiConversationInjection | null>(null);
export interface FluxAiConversationHandle {
    scrollToBottom(): void;
}
export const FluxAiConversation = forwardRef<FluxAiConversationHandle, HTMLAttributes<HTMLDivElement> & { empty?: ReactNode; isGrouped?: boolean; isSticky?: boolean; jumpToLatestLabel?: string; label?: string }>(function FluxAiConversation({ children, className, empty, isGrouped, isSticky = true, jumpToLatestLabel = 'Jump to latest', label = 'Conversation', ...props }, forwardedRef) {
    const scroller = useRef<HTMLDivElement>(null),
        [atBottom, setAtBottom] = useState(true);
    const scrollToBottom = () => {
        const element = scroller.current;
        if (!element) return;
        if (typeof element.scrollTo === 'function') element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
        else element.scrollTop = element.scrollHeight;
    };
    useImperativeHandle(forwardedRef, () => ({ scrollToBottom }));
    useEffect(() => {
        if (isSticky) scrollToBottom();
    }, [children, isSticky]);
    let previousDay: string | undefined;
    const turns = Children.toArray(children)
        .filter(isValidElement)
        .map((child, index) => {
            const day = (child as ReactElement<{ day?: string }>).props.day,
                separator = isGrouped && day && day !== previousDay ? day : null;
            previousDay = day ?? previousDay;
            return (
                <Fragment key={child.key ?? index}>
                    {separator && (
                        <li className={conversationStyles.conversationDay} role="presentation">
                            <span>{separator}</span>
                        </li>
                    )}
                    {child}
                </Fragment>
            );
        });
    return (
        <FluxAiConversationInjectionKey.Provider value={{ scrollToBottom }}>
            <div {...props} className={clsx(conversationStyles.conversation, className)}>
                <div
                    ref={scroller}
                    className={conversationStyles.conversationScroller}
                    role="log"
                    aria-live="polite"
                    aria-relevant="additions"
                    aria-label={label}
                    tabIndex={0}
                    onScroll={(event) => {
                        const element = event.currentTarget;
                        setAtBottom(element.scrollHeight - element.scrollTop - element.clientHeight <= 24);
                    }}
                >
                    <ol className={conversationStyles.conversationList} role="list">
                        {turns}
                    </ol>
                    {turns.length === 0 && empty && <div className={conversationStyles.conversationEmpty}>{empty}</div>}
                </div>
                {!atBottom && <FluxSecondaryButton className={conversationStyles.conversationJump} iconLeading="arrow-down" aria-label={jumpToLatestLabel} onClick={scrollToBottom} />}
            </div>
        </FluxAiConversationInjectionKey.Provider>
    );
});
export function FluxAiMessage({ actions, author, avatarFallbackInitials, avatarSrc, children, className, dateTime, day: _day, footer, icon, isStreaming, role, when, ...props }: Omit<HTMLAttributes<HTMLElement>, 'role'> & { actions?: ReactNode; author?: string; avatarFallbackInitials?: string; avatarSrc?: string; dateTime?: string; day?: string; footer?: ReactNode; icon?: FluxIconName; isStreaming?: boolean; role: 'assistant' | 'system' | 'user'; when?: string }) {
    const inConversation = useContext(FluxAiConversationInjectionKey),
        Tag = inConversation ? 'li' : 'article',
        authorLabel = author ?? { assistant: 'Assistant', system: 'System', user: 'You' }[role],
        marker = avatarSrc || avatarFallbackInitials ? <FluxAvatar className={messageStyles.messageMarker} fallbackInitials={avatarFallbackInitials} size={30} src={avatarSrc} aria-hidden="true" /> : icon ? <FluxBoxedIcon className={messageStyles.messageMarker} name={icon} rounded size={30} aria-hidden="true" /> : null;
    return (
        <Tag {...props} className={clsx(messageStyles.message, role === 'system' && messageStyles.isSystem, role === 'user' && messageStyles.isUser, marker && messageStyles.hasMarker, isStreaming && messageStyles.isStreaming, className)} aria-busy={isStreaming || undefined}>
            {marker}
            <div className={messageStyles.messageHeader}>
                <span className={messageStyles.messageAuthor}>{authorLabel}</span>
                {when && (
                    <time className={messageStyles.messageWhen} dateTime={dateTime}>
                        {when}
                    </time>
                )}
            </div>
            <div className={messageStyles.messageContent}>{children}</div>
            {footer && <div className={messageStyles.messageFooter}>{footer}</div>}
            {actions && !isStreaming && <FluxActionStack className={messageStyles.messageActions}>{actions}</FluxActionStack>}
        </Tag>
    );
}
export interface FluxAiModel {
    badge?: string;
    description?: string;
    id: string;
    isDisabled?: boolean;
    name: string;
}
export function FluxAiModelSelect({ defaultValue, disabled, models, onValueChange, option, value }: { defaultValue?: string; disabled?: boolean; models: readonly FluxAiModel[]; onValueChange?: (value: string) => void; option?: (props: { isSelected: boolean; model: FluxAiModel }) => ReactNode; value?: string }) {
    const controlled = value !== undefined,
        [inner, setInner] = useState(defaultValue),
        current = controlled ? value : inner,
        selected = models.find((model) => model.id === current);
    return (
        <FluxFlyout label="Model" width={321} opener={({ isOpen, toggle }) => <FluxSecondaryButton disabled={disabled} iconTrailing="angles-up-down" label={selected?.name ?? 'Select model'} aria-haspopup="menu" aria-expanded={isOpen} onClick={toggle} after={selected?.badge && <FluxBadge label={selected.badge} size="small" />} />}>
            {({ close }) => (
                <FluxMenu>
                    {models.map((model) => (
                        <button
                            key={model.id}
                            className={modelStyles.modelSelectOption}
                            type="button"
                            role="menuitemradio"
                            aria-checked={model.id === current}
                            disabled={model.isDisabled}
                            onClick={() => {
                                if (!controlled) setInner(model.id);
                                onValueChange?.(model.id);
                                close();
                            }}
                        >
                            {option?.({ isSelected: model.id === current, model }) ?? (
                                <>
                                    <span className={modelStyles.modelSelectName}>{model.name}</span>
                                    {model.badge && <FluxBadge className={modelStyles.modelSelectBadge} label={model.badge} size="small" />}
                                    {model.description && <span className={modelStyles.modelSelectDescription}>{model.description}</span>}
                                </>
                            )}
                            {model.id === current && <FluxIcon className={modelStyles.modelSelectCheck} name="check" size={16} />}
                        </button>
                    ))}
                </FluxMenu>
            )}
        </FluxFlyout>
    );
}
export interface FluxAiPromptInputHandle {
    blur(): void;
    focus(): void;
}
export const FluxAiPromptInput = forwardRef<FluxAiPromptInputHandle, { accept?: string; actions?: ReactNode; attachments?: File[]; children?: ReactNode; defaultValue?: string; disabled?: boolean; isStreaming?: boolean; maxRows?: number; onAttachmentsChange?: (files: File[]) => void; onStop?: () => void; onSubmit?: (value: string) => void; onValueChange?: (value: string) => void; placeholder?: string; value?: string }>(function FluxAiPromptInput({ accept, actions, attachments, children, defaultValue = '', disabled, isStreaming, maxRows = 10, onAttachmentsChange, onStop, onSubmit, onValueChange, placeholder = 'Message AI…', value }, forwardedRef) {
    const controlled = value !== undefined,
        [inner, setInner] = useState(defaultValue),
        current = controlled ? value : inner,
        field = useRef<HTMLTextAreaElement>(null),
        files = attachments ?? [];
    const update = (next: string) => {
            if (!controlled) setInner(next);
            onValueChange?.(next);
        },
        submit = () => {
            const next = current.trim();
            if (!disabled && !isStreaming && next) onSubmit?.(next);
        };
    useImperativeHandle(forwardedRef, () => ({ blur: () => field.current?.blur(), focus: () => field.current?.focus() }));
    return (
        <div className={clsx(promptStyles.aiPromptInput, disabled && promptStyles.isDisabled)} role="group" aria-label="Prompt">
            {children && <div className={promptStyles.aiPromptInputHeader}>{children}</div>}
            {files.length > 0 && (
                <ul className={promptStyles.aiPromptInputAttachments} role="list" aria-label="Attachments">
                    {files.map((file, index) => (
                        <li key={`${index}-${file.name}`} className={promptStyles.aiPromptInputAttachment}>
                            <span className={promptStyles.aiPromptInputAttachmentLabel} title={file.name}>
                                {file.name}
                            </span>
                            <button className={promptStyles.aiPromptInputAttachmentRemove} type="button" disabled={disabled} aria-label={`Remove ${file.name}`} onClick={() => onAttachmentsChange?.(files.filter((_, at) => at !== index))}>
                                <FluxIcon name="xmark" size={14} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <textarea
                ref={field}
                className={promptStyles.aiPromptInputField}
                rows={1}
                disabled={disabled}
                placeholder={placeholder}
                value={current}
                style={{ '--max-rows': maxRows } as FluxStyle}
                aria-label="Prompt message"
                onChange={(event) => update(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey && !event.nativeEvent.isComposing && current.trim()) {
                        event.preventDefault();
                        submit();
                    }
                }}
            />
            <div className={promptStyles.aiPromptInputActions}>
                {attachments && (
                    <label>
                        <input hidden type="file" multiple accept={accept} disabled={disabled} onChange={(event) => onAttachmentsChange?.([...files, ...Array.from(event.target.files ?? [])])} />
                        <span aria-label="Attach">
                            <FluxIcon name="paperclip" />
                        </span>
                    </label>
                )}
                {actions}
                {isStreaming ? <FluxSecondaryButton className={promptStyles.aiPromptInputSubmit} iconLeading="stop" size="small" aria-label="Stop" onClick={onStop} /> : <FluxPrimaryButton className={promptStyles.aiPromptInputSubmit} disabled={disabled || !current.trim()} iconLeading="arrow-up" size="small" aria-label="Send" onClick={submit} />}
            </div>
        </div>
    );
});
function reasoningLabel(streaming?: boolean, duration?: number) {
    if (streaming) return 'Thinking';
    if (duration === undefined) return 'Reasoning';
    const seconds = Math.max(0, Math.round(duration));
    return seconds < 60 ? `Thought for ${seconds} seconds` : `Thought for ${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}
export function FluxAiReasoning({ children, className, content, defaultExpanded, duration, isExpanded, isStreaming, onExpandedChange }: { children?: ReactNode; className?: string; content?: string; defaultExpanded?: boolean; duration?: number; isExpanded?: boolean; isStreaming?: boolean; onExpandedChange?: (value: boolean) => void }) {
    const expandableId = useId();
    return (
        <FluxExpandable
            expandableId={expandableId}
            className={clsx(reasoningStyles.reasoning, isStreaming && reasoningStyles.isStreaming, className)}
            style={{ '--ai-fade-duration': `${aiConfig.streaming.fadeDuration}ms` } as FluxStyle}
            defaultOpened={defaultExpanded}
            isOpened={isExpanded}
            onToggle={onExpandedChange}
            header={({ isOpen, toggle }) => (
                <button className={clsx(reasoningStyles.reasoningHeader, isOpen && reasoningStyles.isOpened)} id={`${expandableId}-header`} type="button" aria-controls={`${expandableId}-content`} aria-expanded={isOpen} onClick={toggle}>
                    {isStreaming ? <FluxSpinner size={15} /> : <FluxIcon name="brain" size={15} />}
                    <span className={reasoningStyles.reasoningLabel} aria-live="polite">
                        {reasoningLabel(isStreaming, duration)}
                    </span>
                    <FluxIcon className={clsx(reasoningStyles.reasoningChevron, isOpen && reasoningStyles.isOpened)} name="angle-down" size={15} />
                </button>
            )}
            body={<div className={reasoningStyles.reasoningBody}>{children ?? <p className={reasoningStyles.reasoningText}>{content}</p>}</div>}
        />
    );
}
export function FluxAiStreamingText({ code, content, hasMarkdown = true, isStreaming }: { code?: (props: MarkdownCodeProps) => ReactNode; content: string; hasMarkdown?: boolean; isStreaming?: boolean }) {
    const renderCode = (props: MarkdownCodeProps) => code?.(props) ?? <FluxAiCodeBlock {...props} />,
        result = useStreamingMarkdown({ content, fadeClass: aiConfig.streaming.hasFade ? streamingStyles.streamingTextWord : null, isStreaming, renderCode });
    return (
        <FluxProse className={streamingStyles.streamingText} style={{ '--ai-fade-duration': `${aiConfig.streaming.fadeDuration}ms` } as FluxStyle}>
            {hasMarkdown ? result.nodes : <p className={streamingStyles.streamingTextPlain}>{renderText(content, { fadeClass: isStreaming && aiConfig.streaming.hasFade ? streamingStyles.streamingTextWord : null, wordIndex: 0 })}</p>}
        </FluxProse>
    );
}
export interface FluxAiSuggestion {
    icon?: FluxIconName;
    id: string;
    label: string;
}
export function FluxAiSuggestions({ disabled, onSelect, suggestions }: { disabled?: boolean; onSelect?: (suggestion: FluxAiSuggestion) => void; suggestions: readonly FluxAiSuggestion[] }) {
    return (
        <ul className={suggestionStyles.aiSuggestions} role="list" aria-label="Suggestions">
            {suggestions.map((suggestion) => (
                <li key={suggestion.id}>
                    <button className={suggestionStyles.aiSuggestion} type="button" disabled={disabled} onClick={() => onSelect?.(suggestion)}>
                        {suggestion.icon && <FluxIcon className={suggestionStyles.aiSuggestionIcon} name={suggestion.icon} size={16} />}
                        <span className={suggestionStyles.aiSuggestionLabel}>{suggestion.label}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
}
export type FluxAiToolCallStatus = 'running' | 'success' | 'error';
function formatJson(value: string | Record<string, unknown>) {
    try {
        return JSON.stringify(typeof value === 'string' ? JSON.parse(value) : value, null, 4);
    } catch {
        return typeof value === 'string' ? value : String(value);
    }
}
function signature(value?: string | Record<string, unknown>) {
    if (value === undefined) return '';
    let parsed: Record<string, unknown>;
    try {
        parsed = typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
        return '';
    }
    const summary = Object.entries(parsed)
        .map(([key, item]) => `${key}: ${typeof item === 'string' ? JSON.stringify(item.length > 24 ? `${item.slice(0, 24)}...` : item) : Array.isArray(item) ? `[${item.length}]` : item && typeof item === 'object' ? '{...}' : String(item)}`)
        .join(', ');
    return summary.length > 60 ? `${summary.slice(0, 60)}...` : summary;
}
export function FluxAiToolCall({ arguments: args, argumentsContent, defaultExpanded, duration, isExpanded, name, onExpandedChange, result, resultContent, status = 'success' }: { arguments?: string | Record<string, unknown>; argumentsContent?: (value: string | null) => ReactNode; defaultExpanded?: boolean; duration?: number; isExpanded?: boolean; name: string; onExpandedChange?: (expanded: boolean) => void; result?: string; resultContent?: (value: string | null) => ReactNode; status?: FluxAiToolCallStatus }) {
    const expandableId = useId();
    const formatted = args === undefined ? null : formatJson(args),
        [full, setFull] = useState(false),
        visible = result && !full && result.length > aiConfig.toolCall.resultLimit ? `${result.slice(0, aiConfig.toolCall.resultLimit)}...` : result,
        statusLabel = { running: 'Running', success: 'Succeeded', error: 'Failed' }[status];
    const section = (label: string, value: string | null, content?: (value: string | null) => ReactNode) =>
        value !== null || content ? (
            <section className={toolStyles.aiToolCallSection}>
                <div className={toolStyles.aiToolCallSectionHeader}>
                    <span className={toolStyles.aiToolCallSectionLabel}>{label}</span>
                    {value !== null && (
                        <button className={toolStyles.aiToolCallAction} type="button" onClick={() => void copy(value)}>
                            <FluxIcon name="copy" size={12} /> Copy
                        </button>
                    )}
                </div>
                {content?.(value) ?? <pre className={toolStyles.aiToolCallOutput}>{value}</pre>}
            </section>
        ) : null;
    return (
        <FluxExpandable
            expandableId={expandableId}
            className={clsx(toolStyles.aiToolCall, toolStyles[`is${status[0].toUpperCase()}${status.slice(1)}`])}
            defaultOpened={defaultExpanded}
            isOpened={isExpanded}
            onToggle={onExpandedChange}
            header={({ isOpen, toggle }) => (
                <button id={`${expandableId}-header`} className={toolStyles.aiToolCallHeader} type="button" aria-controls={`${expandableId}-content`} aria-expanded={isOpen} onClick={toggle}>
                    <FluxIcon className={clsx(toolStyles.aiToolCallChevron, isOpen && toolStyles.isOpen)} name="angle-right" size={12} />
                    <span className={toolStyles.aiToolCallDot} />
                    <span className={toolStyles.aiToolCallName}>
                        {name}
                        <span className={toolStyles.aiToolCallSignature}>({signature(args)})</span>
                    </span>
                    <span className={clsx(toolStyles.aiToolCallStatus, status === 'success' && toolStyles.isHidden)}>{statusLabel}</span>
                    {duration !== undefined && <span className={toolStyles.aiToolCallDuration}>{duration.toFixed(duration < 10 ? 1 : 0)}s</span>}
                </button>
            )}
            body={
                <div className={toolStyles.aiToolCallBody}>
                    {section('Arguments', formatted, argumentsContent)}
                    {section('Result', visible ?? null, resultContent)}
                    {result && result.length > aiConfig.toolCall.resultLimit && (
                        <button className={toolStyles.aiToolCallMore} type="button" onClick={() => setFull((value) => !value)}>
                            {full ? 'Show less' : 'Show full result'}
                        </button>
                    )}
                </div>
            }
        />
    );
}
export function FluxAiUsage({ cost, inputTokens, isCompact, limit, outputTokens }: { cost?: string; inputTokens?: number; isCompact?: boolean; limit?: number; outputTokens?: number }) {
    const format = new Intl.NumberFormat(),
        total = (inputTokens ?? 0) + (outputTokens ?? 0),
        ratio = limit ? total / limit : 0,
        state = ratio >= 1 ? 'reached' : ratio >= 0.9 ? 'near' : null,
        color: FluxColor = state === 'reached' ? 'danger' : state === 'near' ? 'warning' : 'primary';
    return (
        <div className={clsx(usageStyles.usage, isCompact && usageStyles.isCompact)} role="group" aria-label="Usage">
            {(inputTokens !== undefined || outputTokens !== undefined || cost) && (
                <dl className={usageStyles.usageFigures}>
                    {inputTokens !== undefined && (
                        <div className={usageStyles.usageFigure}>
                            <dt className={usageStyles.usageLabel}>Input tokens</dt>
                            <dd className={usageStyles.usageValue}>{format.format(inputTokens)}</dd>
                        </div>
                    )}
                    {outputTokens !== undefined && (
                        <div className={usageStyles.usageFigure}>
                            <dt className={usageStyles.usageLabel}>Output tokens</dt>
                            <dd className={usageStyles.usageValue}>{format.format(outputTokens)}</dd>
                        </div>
                    )}
                    {cost && (
                        <div className={usageStyles.usageFigure}>
                            <dt className={usageStyles.usageLabel}>Cost</dt>
                            <dd className={usageStyles.usageValue}>{cost}</dd>
                        </div>
                    )}
                </dl>
            )}
            {limit !== undefined && (
                <div className={usageStyles.usageLimit}>
                    <FluxProgressBar className={usageStyles.usageLimitBar} color={color} max={limit} value={total} />
                    <p className={usageStyles.usageLimitLabel}>
                        {format.format(total)} of {format.format(limit)} tokens used
                    </p>
                    {state && (
                        <p className={clsx(usageStyles.usageLimitNotice, state === 'reached' && usageStyles.isReached)}>
                            <FluxIcon name="triangle-exclamation" size={14} /> {state === 'reached' ? 'Token limit reached' : 'Token limit nearly reached'}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
