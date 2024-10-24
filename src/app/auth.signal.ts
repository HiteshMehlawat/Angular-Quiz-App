import { signal } from "@angular/core";


// export const isLoggedIn =signal<boolean>(false);


// Initialize the signal based on the presence of 'uname' in localStorage
export const isLoggedIn = signal(!!localStorage.getItem('uname'));