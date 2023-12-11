import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const Report = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text>Hello World</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
});

export default Report;
