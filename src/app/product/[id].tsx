import { PRODUCTS } from '@/utils/data/products'
import { Image, Text, View } from 'react-native'
import { useLocalSearchParams, useNavigation, Redirect } from 'expo-router'
import { formatCurrency } from '@/utils/functions'
import { Button } from '@/components/atoms/Button'
import { Feather } from '@expo/vector-icons'
import { LinkButton } from '@/components/atoms/LinkButton'
import { useCartStore } from '@/stores/cartStore'

export default function ProductPage() {
  const { add, products } = useCartStore()
  const { id } = useLocalSearchParams()
  const { goBack } = useNavigation()

  const product = PRODUCTS.find((product) => {
    return product.id === id
  })

  function handleAddToCard() {
    add(product!)
    goBack()
  }

  if (!product) {
    return <Redirect href={'/'} />
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        alt={`${product.title} Cover`}
        className="w-full h-52"
        resizeMode="cover"
      />

      <View className="p-5 mt-8 flex-1">
        <Text className="text-white text-xl font-heading">{product.title}</Text>

        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 text-base font-body leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => {
          return (
            <Text
              key={ingredient}
              className="text-slate-400 font-body text-base leading-6"
            >
              {'\u2022'} {ingredient}
            </Text>
          )
        })}

        <View className="pt-5 pb-8 gap-5 mt-auto">
          <Button onPress={handleAddToCard}>
            <Button.Icon>
              <Feather name="plus-circle" size={20} />
            </Button.Icon>
            <Button.Text>Adicionar ao pedido</Button.Text>
          </Button>

          <LinkButton title="Voltar ao cardápio" href="/" />
        </View>
      </View>
    </View>
  )
}
