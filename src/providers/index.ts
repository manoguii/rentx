import { container } from 'tsyringe'

import { IDateProvider } from './date-provider/IDateProvider'
import { DayJsDateProvider } from './date-provider/implementations/day-js-date-provider'
import { IMailProvider } from './mail-provider/IMailProvider'
import { EtherealMailProvider } from './mail-provider/implementations/ethereal-mail-provider'

container.registerSingleton<IDateProvider>(
  'DayJsDateProvider',
  DayJsDateProvider,
)

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
)
