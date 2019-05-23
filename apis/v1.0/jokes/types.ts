/**
 * Defines input format for the create joke API
 */
interface IJokeCreateRequest {
    punchline: string;
    tag: string;
}

/**
 * Defines input format for the update joke API
 */
interface IJokeUpdateRequest {
    id: string;
    punchline?: string;
    tag?: string;
}

/**
 * Defines the joke entity. Returned as part of the get joke API
 */
interface IJoke {
    id: string;
    punchline: string;
    tag: string;
    createdAt: string;
    modifiedAt: string;
}

/**
 * Defines the types of tag a joke can have
 */
enum ITag {
    Geeky,
    Rude,
    Seasonal,
    Gross,
    Puns,
}
