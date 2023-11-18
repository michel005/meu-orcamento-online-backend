import { useMySQLDatabaseReturnType } from '../hooks/useMySQLDatabase'
import { UserType } from './User.type'
import { UserTokenType } from './UserTokenType'
import { CustomerType } from './Customer.type'
import { AddressType } from './Address.type'
import { ProductType } from './Product.type'

export type DatabaseType = {
	user: useMySQLDatabaseReturnType<UserType>
	user_token: useMySQLDatabaseReturnType<UserTokenType>
	customer: useMySQLDatabaseReturnType<CustomerType>
	address: useMySQLDatabaseReturnType<AddressType>
	product: useMySQLDatabaseReturnType<ProductType>
}
