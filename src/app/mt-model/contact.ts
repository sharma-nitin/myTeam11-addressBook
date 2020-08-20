export class Contact {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phoneno: string,
    public country: string,
    public state: string,
    public id?: string
  ) { }
}
