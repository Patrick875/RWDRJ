/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"node_modules/flowbite-react/lib/esm/**/*.js",
	],
	theme: {
		extend: {
			colors: {
				"primary-orange": "#C29F1D",
				"primary-orangeTrans": "rgba(194, 159, 45,0.85)",
				"hero-cover": "rgba(255,255,255,0.58)",
				"page-cover": "rgba(0,0,0,0.68)",
			},
			backgroundImage: {
				"image-our-team":
					"url('https://res.cloudinary.com/didikwl4i/image/upload/v1712413957/RWDJ-IMAGES/team_agw2q9.jpg')",
				"image-1":
					"url('https://res.cloudinary.com/didikwl4i/image/upload/v1708953721/RWDJ-IMAGES/image-1_hab59o.webp')",
				"image-2":
					"url('https://res.cloudinary.com/didikwl4i/image/upload/v1708953723/RWDJ-IMAGES/image-2_lqhyen.webp')",
				"image-3":
					"url('https://res.cloudinary.com/didikwl4i/image/upload/v1708953718/RWDJ-IMAGES/image-3_xgqxve.webp')",
				"image-whoweare":
					"url('https://res.cloudinary.com/didikwl4i/image/upload/v1708953716/RWDJ-IMAGES/whoweare_a5cyzd.webp')",
				"image-advocacy":
					"url('https://res.cloudinary.com/didikwl4i/image/upload/v1708953709/RWDJ-IMAGES/advocacy_s2gkbb.webp')",
				"image-training":
					"url('https://res.cloudinary.com/didikwl4i/image/upload/v1708953715/RWDJ-IMAGES/service_men0k2.webp')",
				"image-service":
					"url('https://res.cloudinary.com/didikwl4i/image/upload/v1712939108/IMG_5647_fylfhn.jpg')",
				"image-digitalApp":
					"url('https://res.cloudinary.com/didikwl4i/image/upload/v1712940031/_DSC6473_lw1kba.jpg')",
			},
			fontFamily: {
				hanuman: ["Hanuman", "serif"],
				montserrat: ["Montserrat", "sans-serif"],
				playfair: ["Playfair Display", "serif"],
				lora: ["Lora", "serif"],
			},
			content: {
				openquotes: "url('./assets/openquotes.svg')",
				closequotes: "url('./assets/closequotes.svg')",
			},
			fontSize: {
				sm: "0.8rem",
				base: "1rem",
				xl: "1.25rem",
				"2xl": "1.563rem",
				"3xl": "1.953rem",
				"4xl": "2.441rem",
				"5xl": "3.052rem",
				"8xl": "5.52rem",
			},
		},

		screens: {
			xs: "480px",
			sm: "768px",
			md: "1060px",
		},
	},
	plugins: [require("flowbite/plugin")],
};
