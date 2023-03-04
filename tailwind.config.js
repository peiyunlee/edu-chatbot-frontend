/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,svelte}"],
    theme: {
        extend: {
          screens: {
          },
          height: {
            header: "56px",
            '1':"1px"
          },
          colors: {
            white: "#ffffff",
            black: "#333333",
            green: {
              400: "#1DB446",
            },
            red:{
              400:"#E46573",
            },
            purple:{
              400:"#6477D3",
            },
            gray:{
              200:"#F8F8F8",
              300:"#D9D9D9",
              400:"#828282",
            }
          },
          backgroundImage:{
            // 'login':"url('./assets/img/starsunset.jpg')"
          },
          boxShadow: {
            'btn': "0px 1px 4px rgba(0, 0, 0, 0.25)",
          },
        },
      },
    plugins: [],
  }