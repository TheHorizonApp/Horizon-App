const lightTheme = {
    background: "white",
    text: "black",
    activeDot: "black",
    button: "black",
    buttonText: "white",
    habitContainer: "#121212",
    unfillColor: "white",
    cancelIconColor: "white",
    widgetText: "white",
    progressBar: "#666666",
    defaultMast: "#E2E2E2",
    notLiked: "gray",
    liked: 'white',
  };
  
  const darkTheme = {
    background: "#1A1A1A",
    text: "white",
    activeDot: "white",
    button: "white",
    buttonText: "black",
    habitContainer: "white",
    unfillColor: "black",
    cancelIconColor: "black",
    widgetText: "black",
    progressBar: "#C8C8C8",
    defaultMast: "#2F2B2E",
    notLiked: "gray",
    liked: "white"
  };
  
  export default theme = (mode) => (mode === "light" ? lightTheme : darkTheme);