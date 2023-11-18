import { PrismaClient } from '@prisma/client'
import { useMySQLDatabase, useMySQLDatabaseReturnType } from '../hooks/useMySQLDatabase'
import { UserType } from '../types/User.type'
import { UserTokenType } from '../types/UserTokenType'
import { CustomerType } from '../types/Customer.type'
import { ProductType } from '../types/Product.type'
import { AddressType } from '../types/Address.type'

class Databases {
	public user: useMySQLDatabaseReturnType<UserType>
	public user_token: useMySQLDatabaseReturnType<UserTokenType>
	public customer: useMySQLDatabaseReturnType<CustomerType>
	public product: useMySQLDatabaseReturnType<ProductType>
	public address: useMySQLDatabaseReturnType<AddressType>

	constructor(prisma: PrismaClient) {
		this.user = useMySQLDatabase(prisma.user, ['address'])
		this.user_token = useMySQLDatabase(prisma.user_token, ['user'])
		this.customer = useMySQLDatabase(prisma.customer, ['address', 'user'])
		this.product = useMySQLDatabase(prisma.product, ['customer', 'user'])
		this.address = useMySQLDatabase(prisma.address)
	}
}

export const Database = new Databases(new PrismaClient())
