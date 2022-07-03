export class AuthResponse {
    constructor(
        public isAuthSuccessful?: boolean,
        public errorMessage?: string,
        public token?: string
    ) { }
}