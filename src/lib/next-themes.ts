
export const useTheme = () => {
  return {
    theme: "light",
    setTheme: (theme: string) => {
      console.log(`Theme would be set to ${theme}`);
    }
  }
}
