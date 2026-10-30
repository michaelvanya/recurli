import { memo } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff8e7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    fontSize: 15,
    color: '#081126',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fff8e7',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#ea7a53',
    borderColor: '#ea7a53',
  },
  filterIcon: {
    fontSize: 18,
    color: '#081126',
  },
  filterIconActive: {
    color: '#fff9e3',
  },
})

type SearchBarProps = {
  searchText: string
  onSearchChange: (text: string) => void
  onFilterPress: () => void
  isFilterActive: boolean
}

function SearchBarBase({ searchText, onSearchChange, onFilterPress, isFilterActive }: SearchBarProps) {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search subscriptions..."
        placeholderTextColor="rgba(0,0,0,0.4)"
        value={searchText}
        onChangeText={onSearchChange}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
      <TouchableOpacity
        style={[styles.filterButton, isFilterActive && styles.filterButtonActive]}
        onPress={onFilterPress}
        activeOpacity={0.7}
      >
        <Text style={[styles.filterIcon, isFilterActive && styles.filterIconActive]}>⚙</Text>
      </TouchableOpacity>
    </View>
  )
}

export const SearchBar = memo(SearchBarBase)
