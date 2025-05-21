"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { app, db } from "@lib/firebase";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Application } from "../../common/interface/interface";

// Define types for your application data
// Register fonts
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/helvetica/v15/Helvetica.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/helvetica/v15/Helvetica-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.3,
  },
  header: {
    textAlign: "center",
    marginBottom: 3,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 7,
  },
  logo: {
    width: 40, // Adjust as needed
    height: 40, // Adjust as needed
  },
  title: {
    fontSize: 15,
    fontWeight: "semibold",
    marginBottom: 7,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
  },
  divider: {
    width: "100%",
    height: 0.7,
    backgroundColor: "#333",
    marginBottom: 9,
  },
  metaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
    fontSize: 9,
  },
  section: {
    borderWidth: 0.5,
    borderColor: "#999",
    borderRadius: 3,
    padding: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 11,
    marginBottom: 6,
  },
  gridContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  gridHalf: {
    width: "50%",
    gap:3
  },
  table: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#999",
    marginTop: 6,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#999",
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
    fontSize: 9,
  },
  tableCell: {
    padding: 4,
    borderRightWidth: 0.5,
    borderRightColor: "#999",
    flex: 1,
    fontSize: 9,
  },
  lastCell: {
    borderRightWidth: 0,
  },
  checklistSection: {
    marginVertical: 12,
  },
  checklistHeader: {
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 6,
  },
  checklistRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  checklistNumber: {
    width: 15,
  },
  checklistItem: {
    flex: 1,
  },
  signatureSection: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#999",
    fontSize: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
});

const ApplicationPDFDocument = ({
  application,
}: {
  application: Application;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            src="/logomain.png" // Replace with your actual logo path
          />
        </View>
        <Text style={styles.title}>Carmel Polytechnic College</Text>
        <Text style={styles.subtitle}>
          Application for Polytechnic Admission 2024-2025
        </Text>
        <Text style={{ marginBottom: 4 }}>Management Merit - Regular</Text>
        <Text style={{ fontSize: 8 }}>
          Govt. Management Quota Application No. (www.polyadmission.org): 131752
        </Text>
      </View>

      <View style={styles.divider} />

      {/* Application Meta */}
      <View style={styles.metaInfo}>
        <Text>Application Number: {application?.generatedId}</Text>
        <Text>Index Score: 6.7875004</Text>
        <Text>Fees to be remitted: Rs. 200/-</Text>
      </View>

      {/* Branch Preference */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Branch Preference</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: 9,
          }}
        >
          <Text>
            <Text style={styles.boldText}>Preference 1:</Text> {application?.preferenceOne}
          </Text>
          <Text>
            <Text style={styles.boldText}>Preference 2:</Text> NIL
          </Text>
          <Text>
            <Text style={styles.boldText}>Preference 3:</Text> NIL
          </Text>
        </View>
      </View>

      {/* Candidate Profile */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Candidate Profile</Text>
        <View style={styles.gridContainer}>
          <View style={styles.gridHalf}>
            <Text>
              <Text style={styles.boldText}>Name of the Applicant:</Text>{" "}
              {application?.firstName}{" "}{application?.lastName}
            </Text>
            <Text>
              <Text style={styles.boldText}>Date of Birth:</Text> 27/12/2005
            </Text>
            <Text>
              <Text style={styles.boldText}>Religion:</Text> Hindu
            </Text>
            <Text>
              <Text style={styles.boldText}>Email:</Text>{" "}
              ssreesanth025@gmail.com
            </Text>
            <Text>
              <Text style={styles.boldText}>Aadhar Number:</Text> 937746347271
            </Text>
          </View>
          <View style={styles.gridHalf}>
            <Text>
              <Text style={styles.boldText}>Gender:</Text> Male
            </Text>
            <Text>
              <Text style={styles.boldText}>Place of Birth:</Text> ALAPPUZHA
            </Text>
            <Text>
              <Text style={styles.boldText}>Community:</Text> EZHAVA
            </Text>
            <Text>
              <Text style={styles.boldText}>Phone Number:</Text> 8113053904
            </Text>
          </View>
        </View>
        <Text style={{ marginTop: 4 }}>
          <Text style={styles.boldText}>Address:</Text> Parampil, Mithrakkary,
          Mithrakkary P O, Alappuzha, PIN Code: 689595, Kerala, India
        </Text>
      </View>

      {/* Academic History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Academic History</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { flex: 0.8 }]}>Course</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>Institution</Text>
            <Text style={[styles.tableCell, { flex: 1.2 }]}>Board</Text>
            <Text style={[styles.tableCell, styles.lastCell, { flex: 0.6 }]}>
              Year
            </Text>
          </View>
          {/* Table Row */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 0.8 }]}>SSLC</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              St. Xaviers HS Mithrakkary
            </Text>
            <Text style={[styles.tableCell, { flex: 1.2 }]}>Kerala State</Text>
            <Text style={[styles.tableCell, styles.lastCell, { flex: 0.6 }]}>
              2022
            </Text>
          </View>
        </View>
      </View>

      {/* Qualifying Examination */}
      <View style={styles.section}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <Text style={styles.boldText}>Qualifying Examination: SSLC</Text>
          <Text style={styles.boldText}>Chances taken: 1</Text>
        </View>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { flex: 0.3 }]}>No.</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>Subject</Text>
            <Text style={[styles.tableCell, styles.lastCell, { flex: 0.4 }]}>
              Grade
            </Text>
          </View>
          {/* Table Rows */}
          {[
            [1, "First Language – Paper I", "C"],
            [2, "First Language – Paper II", "A+"],
            [3, "English", "A"],
            [4, "Hindi", "A+"],
            [5, "Social Science", "C+"],
            [6, "Physics", "B+"],
            [7, "Chemistry", "B"],
            [8, "Biology", "B+"],
            [9, "Mathematics", "B"],
            [10, "Information Technology", "A+"],
          ].map(([no, subject, grade]) => (
            <View key={no as number} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 0.3 }]}>
                {no as number}
              </Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>
                {subject as string}
              </Text>
              <Text style={[styles.tableCell, styles.lastCell, { flex: 0.4 }]}>
                {grade as string}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Guardian Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Guardian Info</Text>
        <View style={styles.gridContainer}>
          <View style={styles.gridHalf}>
            <Text>
              <Text style={styles.boldText}>Name of the Guardian:</Text> SASI
            </Text>
            <Text>
              <Text style={styles.boldText}>Occupation:</Text> Fisherman
            </Text>
            <Text>
              <Text style={styles.boldText}>Phone Number:</Text> 8113053904
            </Text>
          </View>
          <View style={styles.gridHalf}>
            <Text>
              <Text style={styles.boldText}>Relationship with Applicant:</Text>{" "}
              Father
            </Text>
            <Text>
              <Text style={styles.boldText}>Monthly Income:</Text> 1000
            </Text>
          </View>
        </View>
        <Text style={{ marginTop: 4 }}>
          <Text style={styles.boldText}>Address (Residence):</Text> Parampil,
          Mithrakkary, Mithrakkary P O, Alappuzha, PIN Code
        </Text>
      </View>
    </Page>

    {/* New Page for Checklist */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Checklist for the Applicant</Text>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { flex: 0.3 }]}>No.</Text>
            <Text style={[styles.tableCell, { flex: 2.5 }]}>Item</Text>
            <Text style={[styles.tableCell, { flex: 0.5 }]}>Yes/No</Text>
          </View>

          {/* Table Rows */}
          {[
            "I have filled-in the correct information.",
            "I have uploaded the copy of statement of marks card of class X.",
            "My parent/guardian and I have signed the declaration on the printed application form.",
            "I am attaching the copy of application processing fee challan.",
          ].map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 0.3 }]}>
                {index + 1}.
              </Text>
              <Text style={[styles.tableCell, { flex: 2.5 }]}>{item}</Text>
              <Text style={[styles.tableCell, { flex: 0.5 }]}></Text>
            </View>
          ))}
        </View>

        {/* Signature Section */}
        <View style={[styles.signatureSection, { marginTop: 30 }]}>
          <Text>Place: _________________________</Text>
          <Text>Date: 10.06.2024</Text>
          <Text style={{ marginTop: 15 }}>
            Signature of the Candidate: _________________________
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default function Download() {
  const params = useParams();
  const appId = params?.appId as string;
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appId) return;

    const fetchApplication = async () => {
      try {
        const docRef = doc(db, "admission_application", appId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setApplication({ id: docSnap.id, ...docSnap.data() } as Application);
        } else {
          console.error("No such application!");
        }
      } catch (err) {
        console.error("Error fetching application:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [appId]);

  if (loading) return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  if (!application) return <div className="w-full h-full flex items-center justify-center">No application data found</div>;

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
      Your Application PDF is Ready!
    </h2>
    <p className="text-gray-600 mb-4 text-center">
      Click the button below to download your application as a professionally formatted PDF.
    </p>
  
    <PDFDownloadLink
      document={<ApplicationPDFDocument application={application} />}
      fileName={`${
        application?.firstName +
          "_" +
          application?.lastName  || "application"
      }.pdf`}
    >
      {({ loading }) => (
        <button
          disabled={loading}
          className="px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Preparing your document..." : "Download Your PDF"}
        </button>
      )}
    </PDFDownloadLink>
  </div>
  
  );
}
