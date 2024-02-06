import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

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

      {cartItemsCount > 0 ? (
        <TouchableOpacity className="relative" activeOpacity={0.7}>
          <View className="bg-lime-300 w-4 h-4 rounded-full flex items-center justify-center absolute z-20 -top-2 -right-1.5">
            <Text className="text-slate-900 font-bold text-xs">
              {cartItemsCount}
            </Text>
          </View>

          <Feather name="shopping-bag" color={colors.white} size={24} />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}
