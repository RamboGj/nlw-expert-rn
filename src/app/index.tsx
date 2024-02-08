import { View, FlatList, SectionList, Text } from 'react-native'
import { useState, useRef } from 'react'
import { Link } from 'expo-router'

import { CategoryButton } from '@/components/atoms/CategoryButton'
import { Header } from '@/components/molecules/Header'
import { Product } from '@/components/atoms/Product'

import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'
import { useCartStore } from '@/stores/cartStore'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CATEGORIES[0],
  )

  const { products } = useCartStore()

  const cartItemsQuantity = products.reduce(
    (total, product) => total + product.quantity,
    0,
  )

  const sectionListRef = useRef<SectionList<ProductProps>>(null)

  function handleSelectCategory(category: string) {
    setSelectedCategory(category)

    const sectionIndex = CATEGORIES.findIndex((categoryFilter) => {
      return categoryFilter === category
    })

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartItemsCount={cartItemsQuantity} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isSelected = item === selectedCategory

          return (
            <CategoryButton
              onPress={() => handleSelectCategory(item)}
              isSelected={isSelected}
              title={item}
            />
          )
        }}
        horizontal
        className="max-h-12 mt-5"
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 20,
        }}
        showsHorizontalScrollIndicator={false}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product
              description={item.description}
              thumbnail={item.thumbnail}
              title={item.title}
              className="text-white"
            />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-white font-heading text-xl mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}
