import { Feather } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

interface CartItemsProps {
  count?: number
}

export function CartItems({ count }: CartItemsProps) {
  return (
    <TouchableOpacity className="relative" activeOpacity={0.7}>
      <View className="bg-lime-300 w-4 h-4 rounded-full flex items-center justify-center absolute z-20 -top-2 -right-1.5">
        <Text className="text-slate-900 font-bold text-xs">{count}</Text>
      </View>

      <Feather name="shopping-bag" color={colors.white} size={24} />
    </TouchableOpacity>
  )
}
