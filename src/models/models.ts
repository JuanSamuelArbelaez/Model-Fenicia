export interface UserCredentials {
    Password: string,
    Nickname: string,
    Email: string,
    ID: string,
}

export interface UserProfile {
    ID: string,
    Nickname: string,
    Email: string,
}

export interface MovieInfo {
    ID: number;
    Title: string;
    Overview: string;
    ReleaseDate: string;
    OriginalLanguage: string;
  }