import { useCallback, useMemo, useState } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

const CATEGORIES = [
  'Entertainment',
  'AI Tools',
  'Developer Tools',
  'Design',
  'Productivity',
  'Cloud',
  'Music',
  'Other',
]

const CATEGORY_COLORS: Record<string, { color: string; iconBg: string }> = {
  'Entertainment': { color: 'bg-[#FFDA4D]', iconBg: 'bg-[#FFF0A7]' },
  'AI Tools': { color: 'bg-[#9BB9E0]', iconBg: 'bg-[#B7D0ED]' },
  'Developer Tools': { color: 'bg-[#9BB9E0]', iconBg: 'bg-[#B7D0ED]' },
  'Design': { color: 'bg-subscription', iconBg: 'bg-[#B4E0D3]' },
  'Productivity': { color: 'bg-subscription', iconBg: 'bg-[#B4E0D3]' },
  'Cloud': { color: 'bg-[#C7DDA5]', iconBg: 'bg-[#DDEBC7]' },
  'Music': { color: 'bg-[#C7DDA5]', iconBg: 'bg-[#DDEBC7]' },
  'Other': { color: 'bg-[#D8C6A0]', iconBg: 'bg-[#E8D8B8]' },
}

const CATEGORY_ICONS: Record<string, string> = {
  'Entertainment': '★',
  'AI Tools': '◎',
  'Developer Tools': '⟨/⟩',
  'Design': '✦',
  'Productivity': 'P',
  'Cloud': '☁',
  'Music': '♫',
  'Other': '●',
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff9e3',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#081126',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff8e7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    color: '#081126',
  },
  formContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#fff8e7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    fontSize: 16,
    color: '#081126',
  },
  inputFocused: {
    borderColor: '#ea7a53',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8e7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 2,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.4)',
    marginRight: 4,
  },
  frequencyToggle: {
    flexDirection: 'row',
    gap: 12,
  },
  frequencyBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#fff8e7',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
  },
  frequencyBtnActive: {
    backgroundColor: '#ea7a53',
    borderColor: '#ea7a53',
  },
  frequencyText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#081126',
  },
  frequencyTextActive: {
    color: '#fff9e3',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff8e7',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  categoryChipActive: {
    backgroundColor: '#ea7a53',
    borderColor: '#ea7a53',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#081126',
  },
  categoryTextActive: {
    color: '#fff9e3',
  },
  submitButton: {
    backgroundColor: '#ea7a53',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff9e3',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
})

export type NewSubscriptionData = {
  id: string
  icon: string
  name: string
  plan: string
  category: string
  paymentMethod: string
  status: 'active' | 'paused' | 'cancelled'
  startDate: string
  price: number
  currency: string
  billing: 'Monthly' | 'Yearly'
  renewalDate: string
  color: string
  iconBg: string
}

type CreateSubscriptionModalProps = {
  visible: boolean
  onClose: () => void
  onCreate: (subscription: NewSubscriptionData) => void
}

function CreateSubscriptionModalBase({
  visible,
  onClose,
  onCreate,
}: CreateSubscriptionModalProps) {
  const [name, setName] = useState('')
  const [priceText, setPriceText] = useState('')
  const [frequency, setFrequency] = useState<'Monthly' | 'Yearly'>('Monthly')
  const [category, setCategory] = useState('')
  const [nameFocused, setNameFocused] = useState(false)
  const [priceFocused, setPriceFocused] = useState(false)

  const priceValue = useMemo(() => {
    const parsed = parseFloat(priceText)
    return isNaN(parsed) ? 0 : parsed
  }, [priceText])

  const isValid = name.trim().length > 0 && priceValue > 0 && category.length > 0

  const resetForm = useCallback(() => {
    setName('')
    setPriceText('')
    setFrequency('Monthly')
    setCategory('')
    setNameFocused(false)
    setPriceFocused(false)
  }, [])

  const handleClose = useCallback(() => {
    resetForm()
    onClose()
  }, [resetForm, onClose])

  const handleSubmit = useCallback(() => {
    if (!isValid) return

    const now = new Date()
    const startDate = now.toISOString()

    let renewalDate: Date
    if (frequency === 'Monthly') {
      renewalDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
    } else {
      renewalDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
    }

    const categoryKey = category
    const icon = CATEGORY_ICONS[categoryKey] || '●'
    const colors = CATEGORY_COLORS[categoryKey] || CATEGORY_COLORS['Other']

    const subscription: NewSubscriptionData = {
      id: `sub-${Date.now()}`,
      icon,
      name: name.trim(),
      plan: `${frequency} Plan`,
      category: categoryKey,
      paymentMethod: 'Visa ending in 8530',
      status: 'active',
      startDate,
      price: priceValue,
      currency: 'USD',
      billing: frequency,
      renewalDate: renewalDate.toISOString(),
      color: colors.color,
      iconBg: colors.iconBg,
    }

    onCreate(subscription)
    resetForm()
    onClose()
  }, [name, priceValue, frequency, category, isValid, onCreate, resetForm, onClose])

  const handlePriceChange = useCallback((text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '')
    const parts = cleaned.split('.')
    if (parts.length <= 2) {
      setPriceText(parts.join('.'))
    }
  }, [])

  if (!visible) return null

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.overlay} onPress={handleClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View onStartShouldSetResponder={() => true} style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>New Subscription</Text>
              <Pressable style={styles.closeBtn} onPress={handleClose}>
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
            </View>

            <ScrollView
              contentContainerStyle={styles.formContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={[styles.input, nameFocused && styles.inputFocused]}
                  placeholder="Subscription name"
                  placeholderTextColor="rgba(0,0,0,0.3)"
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  autoCapitalize="words"
                />
              </View>

              <View>
                <Text style={styles.label}>Price</Text>
                <View style={styles.priceInputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={[
                      {
                        flex: 1,
                        fontSize: 16,
                        color: '#081126',
                        paddingVertical: 14,
                      },
                      priceFocused && styles.inputFocused,
                    ]}
                    placeholder="0.00"
                    placeholderTextColor="rgba(0,0,0,0.3)"
                    value={priceText}
                    onChangeText={handlePriceChange}
                    keyboardType="decimal-pad"
                    onFocus={() => setPriceFocused(true)}
                    onBlur={() => setPriceFocused(false)}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.label}>Frequency</Text>
                <View style={styles.frequencyToggle}>
                  <TouchableOpacity
                    style={[
                      styles.frequencyBtn,
                      frequency === 'Monthly' && styles.frequencyBtnActive,
                    ]}
                    onPress={() => setFrequency('Monthly')}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.frequencyText,
                        frequency === 'Monthly' && styles.frequencyTextActive,
                      ]}
                    >
                      Monthly
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.frequencyBtn,
                      frequency === 'Yearly' && styles.frequencyBtnActive,
                    ]}
                    onPress={() => setFrequency('Yearly')}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.frequencyText,
                        frequency === 'Yearly' && styles.frequencyTextActive,
                      ]}
                    >
                      Yearly
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text style={styles.label}>Category</Text>
                <View style={styles.categoryGrid}>
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat
                    return (
                      <TouchableOpacity
                        key={cat}
                        style={[
                          styles.categoryChip,
                          isSelected && styles.categoryChipActive,
                        ]}
                        onPress={() => setCategory(cat)}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.categoryText,
                            isSelected && styles.categoryTextActive,
                          ]}
                        >
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>

              <Pressable
                style={[
                  styles.submitButton,
                  !isValid && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={styles.submitButtonText}>Create Subscription</Text>
              </Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  )
}

export const CreateSubscriptionModal = CreateSubscriptionModalBase
