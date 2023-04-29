import { IMailProvider } from '../IMailProvider'

class MailProviderInMemory implements IMailProvider {
  private message: any[] = []

  async sendEmail(
    to: string,
    subject: string,
    variable: any,
    path: string,
  ): Promise<void> {
    this.message.push(path, path, path, to)
  }
}

export { MailProviderInMemory }
