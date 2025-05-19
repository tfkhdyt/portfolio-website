<script lang="ts">
	import { onMount } from 'svelte';
	import Highlight from 'svelte-highlight';
	import json from 'svelte-highlight/languages/json';
	import 'svelte-highlight/styles/atom-one-dark.css';

	let { formattedJson }: { formattedJson: string } = $props();
	let highlightRef: HTMLElement;

	// Use the original JSON for highlighting
	const processedJson = $derived(formattedJson);

	// Process links after rendering
	onMount(() => {
		processLinks();
	});

	function processLinks() {
		if (!highlightRef) return;

		// Find the highlighted code container
		const codeElements = highlightRef.querySelectorAll('span');
		const urlPattern = /(https?:\/\/[^\s"]+)/g;
		const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;

		// Process each element
		codeElements.forEach((element) => {
			const content = element.textContent || '';
			if (urlPattern.test(content) || emailPattern.test(content)) {
				// First replace URLs
				let html = content.replace(urlPattern, (url) => {
					return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="underline md:no-underline md:hover:underline underline-offset-3">${url}</a>`;
				});

				// Then replace emails with mailto links
				html = html.replace(emailPattern, (email) => {
					return `<a href="mailto:${email}" class="underline md:no-underline md:hover:underline underline-offset-3">${email}</a>`;
				});

				// Safe way to update since we're fully controlling the content
				element.innerHTML = html;
			}
		});
	}
</script>

<div
	class="custom-scrollbar flex-1 overflow-x-hidden overflow-y-auto p-2 font-mono text-xs leading-5 transition-none duration-300 ease-in-out selection:bg-slate-700/50 md:text-sm md:leading-6 md:transition-all xl:text-base"
	style="overscroll-behavior: contain; -webkit-overflow-scrolling: touch; transform: translateZ(0);"
	bind:this={highlightRef}
>
	<Highlight language={json} code={processedJson} />
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 8px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	:global(.hljs) {
		background: transparent !important;
		white-space: pre-wrap !important;
		overflow-x: hidden !important;
		will-change: transform; /* Hint for hardware acceleration */
	}
</style>
