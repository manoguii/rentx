interface IUserResponseDTO {
  email: string;
  name: string;
  id: string;
  driver_license: string;
  avatar: string;
  avatar_url(): string;
}

export { IUserResponseDTO };
