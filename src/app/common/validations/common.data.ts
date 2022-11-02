export class CommonData {

    static getStatus() {
        return [
            { value: 1, text: 'Active' },
            { value: 2, text: 'Inactive' }]
    }


}

enum UserType {
    SupperAdmin = 1,
    Admin = 2,
    SupperUser = 3,
    User = 4
}