<script lang="ts">
	// Import resume.json
	import { default as resume, default as resumeJson } from '$lib/assets/resume.json';
	import BackgroundGlows from '$lib/components/BackgroundGlows.svelte';
	import ResumeCard from '$lib/components/ResumeCard.svelte';
	import Metadata from '$lib/components/Metadata.svelte';

	let { data } = $props();

	// Constants
	const pageTitle = 'Taufik Hidayat - Vibe Coding Cleanup Specialist';
	const pageDescription = resume.data.introduction;
	const siteName = "Taufik Hidayat's Portfolio";

	// States
	let copied = $state(false);
	let isMaximized = $state(false);

	// Format JSON data
	function formatJson<T>(jsonData: T) {
		return JSON.stringify(jsonData, null, 2);
	}

	let formattedJson = $derived(formatJson(resumeJson));

	// Functions
	function copyToClipboard() {
		navigator.clipboard.writeText(formattedJson);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function toggleMaximize() {
		isMaximized = !isMaximized;
	}
</script>

<Metadata {pageTitle} {pageDescription} origin={data.origin} {siteName} />

<main
	class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#13111C] md:p-4"
>
	<!-- Ba kground glows -->
	<BackgroundGlows />

	<!-- Content -->
	<ResumeCard {isMaximized} {copied} {formattedJson} {copyToClipboard} {toggleMaximize} />
</main>
