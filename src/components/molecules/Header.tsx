import { Image, Text, View } from 'react-native'
import { CartItems } from '../atoms/CartItems'

interface HeaderProps {
  title: string
  cartItemsCount?: number
}

export function Header({ title, cartItemsCount = 0 }: HeaderProps) {
  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Image source={require('@/assets/logo.png')} className="h-6 w-32" />
        <Text className="text-white font-heading mt-2 text-xl">{title}</Text>
      </View>

      {cartItemsCount > 0 ? <CartItems count={cartItemsCount} /> : null}
    </View>
  )
}
