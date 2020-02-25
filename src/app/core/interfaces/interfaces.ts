export interface UserView {
    id: string;
    name: string;
}

export interface Page<T> {
    request: {
        page: number;
        size: number;
        sort: string | null;
        filter: string | null;
    }
    totalPages: number;
    totalItems: number;
    content: Array<T>
}

export interface ProjectView {
    id: string;
    name: string;
}

export interface Project extends ProjectView {
    active: boolean;
    code: string;
    owner: UserView;
    manager: UserView;
    baTeamMembers: Array<UserView>;
    devTeamMembers: Array<UserView>;
    qaTeamMembers: Array<UserView>;
    additionalTeamMembers: Array<UserView>;
}

export interface BusinessEntity {
    id: string;
    name: string;
    active: boolean;
    project: ProjectView;
    properties: Array<string> | null;
    functions: Array<string> | null;
}
