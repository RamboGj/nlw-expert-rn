import { Alert, ScrollView, Text, View, Linking } from 'react-native'
import { useState } from 'react'
import { useNavigation } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Header } from '@/components/molecules/Header'
import { Product } from '@/components/atoms/Product'
import { Input } from '@/components/atoms/Input'
import { LinkButton } from '@/components/atoms/LinkButton'
import { Button } from '@/components/atoms/Button'

import { ProductCartProps, useCartStore } from '@/stores/cartStore'

import { formatCurrency } from '@/utils/functions'

const PHONE_NUMBER = '+5517999999999'

export default function Cart() {
  const [address, setAddress] = useState<string>('')

  const { products, remove, clear } = useCartStore()

  const { goBack } = useNavigation()

  const total = formatCurrency(
    products.reduce(
      (total, product) => (total += product.price * product.quantity),
      0,
    ),
  )

  const noProductsFound = products.length === 0

  function handleDeleteProductFromCart(product: ProductCartProps) {
    Alert.alert('Remover', `Deseja remover ${product.title} do carrinho?`, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Remover',
        onPress: () => remove(product.id),
      },
    ])
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert('Pedido', 'Informe os dados da entrega.')
    }

    const orderProducts = products
      .map((product) => `\n${product.quantity} ${product.title}`)
      .join('')

    const message = `
      NOVO PEDIDO
      \n Entregar em: ${address}

      ${orderProducts}

      \n Valor total: ${total}
    `

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`,
    )

    clear()
    goBack()
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {noProductsFound ? (
              <Text className="font-body text-slate-400 text-center">
                Seu carrinho esta vazio.
              </Text>
            ) : (
              <View className="border-b border-slate-700">
                {products.map((product) => {
                  return (
                    <Product
                      key={product.id}
                      onPress={() => handleDeleteProductFromCart(product)}
                      description={product.description}
                      thumbnail={product.thumbnail}
                      title={product.title}
                      quantity={product.quantity}
                    />
                  )
                })}
              </View>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>

            <Input
              onChangeText={(e) => setAddress(e)}
              onSubmitEditing={handleOrder}
              blurOnSubmit
              returnKeyType="next"
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  )
}
