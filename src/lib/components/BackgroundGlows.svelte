<div class="background-glows">
	<div
		class="glow-1 fixed -top-64 -left-64 h-[600px] w-[600px] rounded-full bg-white/[3%] blur-3xl"
	></div>
	<div
		class="glow-2 fixed -right-64 -bottom-64 h-[500px] w-[500px] rounded-full bg-white/[4%] blur-3xl"
	></div>
	<div
		class="glow-3 fixed top-1/3 left-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[2%] blur-3xl"
	></div>
</div>

<style>
	.glow-1 {
		animation: drift 30s ease-in-out infinite;
	}

	.glow-2 {
		animation: drift 25s ease-in-out infinite reverse;
	}

	.glow-3 {
		animation: drift 35s ease-in-out infinite;
	}

	@keyframes drift {
		0%,
		100% {
			transform: translate(0, 0);
		}
		25% {
			transform: translate(60px, -40px);
		}
		50% {
			transform: translate(-30px, 60px);
		}
		75% {
			transform: translate(40px, 30px);
		}
	}
</style>
