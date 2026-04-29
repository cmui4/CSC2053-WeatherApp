import React from "react";
import { Text, View } from "react-native";
import { Suggestion } from "@/constants/suggestions";
import { styles } from "./SuggestionCard.styles";

interface Props {
  suggestion: Suggestion;
}

export default function SuggestionCard({ suggestion }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.emojiWrapper}>
        <Text style={styles.emoji}>{suggestion.emoji}</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{suggestion.title}</Text>
        <Text style={styles.message}>{suggestion.message}</Text>
      </View>
    </View>
  );
}
