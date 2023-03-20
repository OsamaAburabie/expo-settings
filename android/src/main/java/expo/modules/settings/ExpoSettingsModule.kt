package expo.modules.settings

import android.content.Context
import android.content.SharedPreferences
import androidx.core.os.bundleOf
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.types.Enumerable


internal class Person : Record {
  @Field
  var name: String? = null
}





class ExpoSettingsModule : Module() {

  override fun definition() = ModuleDefinition {
    Name("ExpoSettings")



    Events("onChangeTheme")




    Function("setTheme") { theme: Theme ->
      getPreferences().edit().putString("theme", theme.value).commit()
      this@ExpoSettingsModule.sendEvent("onChangeTheme", bundleOf("theme" to theme.value))
    }

    Function("getTheme") {
      return@Function getPreferences().getString("theme", Theme.SYSTEM.value)
    }

    Function("printArray") { array: Array<String> ->
      array.forEach { println(it) }
    }

    Function ("printArrayOfRecords") { array: List<Person> ->
      array.forEach { record ->
        println(record.name)
      }
    }
  }

  private val context
  get() = requireNotNull(appContext.reactContext)

  private fun getPreferences(): SharedPreferences {
    return context.getSharedPreferences(context.packageName + ".settings", Context.MODE_PRIVATE)
  }
}

enum class Theme(val value: String) : Enumerable {
  LIGHT("light"),
  DARK("dark"),
  SYSTEM("system")
}
