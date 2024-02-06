import { forwardRef } from 'react'
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

interface ProductProps extends TouchableOpacityProps {
  title: string
  description: string
  thumbnail: ImageProps
}

export const Product = forwardRef<TouchableOpacity, ProductProps>(
  ({ description, thumbnail, title, ...rest }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className="flex-row w-full items-center pb-4"
        {...rest}
      >
        <Image
          source={thumbnail}
          alt={`Image do produto ${title}`}
          className="w-20 h-20 rounded-md"
        />

        <View className="flex-1 ml-3">
          <Text className="text-slate-100 font-subtitle text-base flex-1">
            {title}
          </Text>
          <Text className="text-slate-400 font-body text-xs leading-5 mt-0.5">
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    )
  },
)

Product.displayName = 'Product'
