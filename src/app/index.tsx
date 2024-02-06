import { CategoryButton } from '@/components/CategoryButton'
import { Header } from '@/components/Header'
import { View, FlatList } from 'react-native'
import { CATEGORIES } from '@/utils/data/products'
import { useState } from 'react'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CATEGORIES[0],
  )

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartItemsCount={1} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isSelected = item === selectedCategory

          return (
            <CategoryButton
              onPress={() => {
                setSelectedCategory(item)
              }}
              isSelected={isSelected}
              title={item}
            />
          )
        }}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
