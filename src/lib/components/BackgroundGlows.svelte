<div class="background-glows">
	<div
		class="animate-pulse-slow fixed -top-48 -left-48 h-[450px] w-[450px] rounded-full bg-blue-500/20 blur-3xl"
	></div>
	<div
		class="animate-pulse-slow fixed -right-48 -bottom-48 h-[450px] w-[450px] rounded-full bg-fuchsia-600/25 blur-3xl"
	></div>
</div>

<style>
	:global(.animate-pulse-slow) {
		animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.5;
		}
		50% {
			opacity: 0.8;
		}
	}
</style>
