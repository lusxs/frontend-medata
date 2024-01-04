import React, { useState, useEffect } from "react";
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
import { parseAndFormatDateString } from "../../../utils/helper";

const Report = ({ data, completedCount, notCompletedCount, canceledCount }) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

  return (
    <Document>
      <Page style={styles.page} size="A4" orientation="landscape">
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={LogoMinahasa} />
            <View style={styles.HeaderContainer}>
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
        <Text style={styles.date}>Hari/Tanggal Terbit: {formattedDate} </Text>
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
                parseAndFormatDateString(item.createdAt),
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
        <Text style={styles.status}>
          Jumlah kunjungan selesai: {completedCount}
        </Text>
        <Text style={styles.status}>
          Jumlah kunjungan batal proses: {canceledCount}
        </Text>
        <Text style={styles.status}>
          Jumlah kunjungan belum proses: {notCompletedCount}
        </Text>
        <Text style={styles.status}>Jumlah kunjungan total:</Text>
      </Page>
    </Document>
  );
};

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
    justifyContent: "center",
    borderBottomWidth: 2,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Distribute space between the logos
    width: "100%", // Take the full width available
  },
  HeaderContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center", // Distribute space between the logos
    width: "100%", // Take the full width available
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  companyAddress: {
    fontSize: 12,
    fontWeight: "light",
    color: "#000000",
    marginTop: 2,
  },
  logo: {
    width: 45,
    fontSize: 14,
    height: 60,
    paddingBottom: 4,
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
    marginBottom: 30,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#B4B4B4",
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingBottom: 4,
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
    fontSize: 12,
    fontWeight: "medium",
    color: "#000000",
    paddingBottom: 2,
  },
});

export default Report;
