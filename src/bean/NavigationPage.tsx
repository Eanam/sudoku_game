class NavigationPage {

    static readonly Home = new NavigationPage("/", "Game")
    static readonly History = new NavigationPage("/history", "History")

    static readonly values: NavigationPage[] = [this.Home, this.History]

    private constructor(
        public readonly path: string,
        public readonly name: string
    ) {}

    toString(): string {
        return `${this.path} ${this.name}`
    }
}

export default NavigationPage