import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import LogoMinahasa from "../../../assets/logo-minahasa.png";
import LogoDinsos from "../../../assets/logo-dinsos.png";

const Report = ({ data }) => (
  <Document>
    <Page style={styles.page} size="A4" orientation="landscape">
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={LogoMinahasa} />
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>
              DINAS SOSIAL KABUPATEN MINAHASA
            </Text>
            <Text style={styles.companyAddress}>
              Jl. Sasaran, Sasaran, Kec. Tondano Utara, Kabupaten Minahasa,
              Sulawesi Utara
            </Text>
          </View>
          <Image style={styles.logo} source={LogoDinsos} />
        </View>
      </View>
      <Text style={styles.reportTitle}>LAPORAN PENGUNJUNG</Text>
      <Text style={styles.date}>Hari/Tanggal Terbit: </Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          {[
            "No",
            "Tanggal",
            "Nama",
            "Umur",
            "NIK",
            "Kontak",
            "Pekerjaan",
            "Alamat",
            "Tujuan",
            "Bidang",
            "Status", // Menambahkan kolom status
          ].map((header, index) => (
            <Text key={index} style={styles.columnHeader}>
              {header}
            </Text>
          ))}
        </View>
        {data.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            {[
              index + 1,
              item.createdAt,
              item.name,
              item.age,
              item.citizenNumber,
              item.phoneNumber,
              item.profession,
              item.address,
              item.purpose.name,
              item.division.name,
              getStatusLabel(item.status),
            ].map((cell, i) => (
              <Text key={i} style={styles.columnCell}>
                {cell}
              </Text>
            ))}
          </View>
        ))}
      </View>
      <Text style={styles.status}>Jumlah kunjungan selesai: </Text>
      <Text style={styles.status}>Jumlah kunjungan batal proses: </Text>
      <Text style={styles.status}>Jumlah kunjungan belum proses: </Text>
    </Page>
  </Document>
);

const getStatusLabel = (status) => {
  switch (status) {
    case "NOT COMPLETED":
      return "Belum Selesai";
    case "COMPLETED":
      return "Selesai";
    case "CANCELED":
      return "Batal Proses";
    default:
      return "";
  }
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    // Menentukan orientasi horizontal
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "space-between",
    borderBottomWidth: 2,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    marginBottom: 4,
  },
  companyAddress: {
    fontSize: 12,
    fontWeight: "light",
    textAlign: "center",
    color: "#000000",
    marginBottom: 6,
  },
  logo: {
    width: 45,
    fontSize: 14,
    height: 60,
    paddingBottom: 4,
    marginRight: 10,
  },
  date: {
    fontSize: 12,
    fontWeight: "semibold",
    color: "#676767",
    paddingBottom: 6,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 28,
    marginBottom: 45,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1, // Tambahkan borderWidth
    borderColor: "#B4B4B4", // Tambahkan borderColor
    borderRightWidth: 1,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
  },
  columnHeader: {
    backgroundColor: "#BDBDBD",
    fontSize: 10,
    fontWeight: "bold",
    padding: 8,
    flex: 1,
    textAlign: "center",
    borderStyle: "solid",
  },
  columnCell: {
    fontSize: 10,
    padding: 8,
    flex: 1,
    textAlign: "center",
    borderStyle: "solid",
  },
  status: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#000000",
    paddingBottom: 4,
  },
});

export default Report;
