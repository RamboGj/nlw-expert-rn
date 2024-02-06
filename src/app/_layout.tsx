import { Slot } from "expo-router"
import { SafeAreaView } from "react-native"
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts
} from "@expo-google-fonts/inter"
import { Loading } from "@/components/atoms/Loading"

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      {fontsLoaded ? <Slot /> : <Loading />}
    </SafeAreaView>
  )
}