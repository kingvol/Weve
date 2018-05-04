import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import I18n from 'react-native-i18n';
import { Button, Container, Content, Text } from '../common';
import { primaryFont, backgroundColor } from '../../theme';

export default ({ isModalVisible, handleDecline, handleAccept }) => (
  <Modal isVisible={isModalVisible}>
    <Container style={styles.modalContent}>
      <Content>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          END USER LICENSE AGREEMENT
        </Text>
        <Text style={styles.boldTitleMargin}>
          Please read this End-User License Agreement ("Agreement" or “EULA”)
          carefully before using “wevedo”, its any service or part. By using or
          accessing the Application, you are agreeing to be bound by the terms
          and conditions of this Agreement.
        </Text>
        <Text style={{ marginTop: 20 }}>
          This EULA creates a legal agreement between you ("you", "your" or
          "User") and
          <Text style={styles.boldTitle}> "wevedo.com"</Text> ("we", "us" or
          "our") for use of our software application
          <Text style={styles.boldTitle}> "wevedo"</Text>, either web-based
          platform made available to you at http://wevedo.com or mobile
          application (collectively referred to as
          <Text style={styles.boldTitle}> "Application"</Text> and/or
          <Text style={styles.boldTitle}> "App"</Text>) including any associated
          updates, supplements, enhancements and/or upgrades, media, materials
          and electronic documentation.
        </Text>
        <Text style={styles.boldTitleMargin}>
          If you do not agree to the terms and conditions of this Agreement, do
          not use or install the App.
        </Text>
        <Text style={styles.boldTitleMargin}>License Grant</Text>
        <Text>
          We grant you a revocable, non-exclusive, non-transferable,
          non-assignable license and limited license to use the App solely for
          your personal or commercial purposes strictly in accordance with the
          terms of this Agreement. A "Commercial User" is defined as an
          individual or entity, or an individual acting on behalf of an entity,
          which use the App for commercial or business. We only authorize you to
          use this App on single account. You can use this App only as client
          App and the ownership of its source code, design or models is
          subjected to us. We shall have the right to audit your use to verify
          compliance with the license terms. You agree to cooperate with our
          audit and provide reasonable assistance and access to information.
          There is no any other license granted except written in this
          Agreement.
        </Text>
        <Text style={styles.boldTitleMargin}>
          Representations Concerning Age
        </Text>
        <Text>
          You represent and warrant that you are at least thirteen (13) years
          old. Children under the age of thirteen (13) are not permitted to use
          our platform.
        </Text>
        <Text style={{ marginTop: 10 }}>
          If you reside in a jurisdiction which restricts the use of
          internet-based applications according to age, or which restricts the
          ability to enter into agreements such as this EULA according to age
          and you are under such age limit, you may not enter into this EULA or
          use the App. By entering into this EULA, you represent that you have
          verified in your own jurisdiction that your use is permitted by law.
        </Text>
        <Text style={styles.boldTitleMargin}>Intellectual Property Rights</Text>
        <Text>
          All rights, title and interest worldwide, including all associated
          intellectual property rights in and to the App are owned by us.
        </Text>
        <Text style={styles.boldTitleMargin}>Third-Party Services</Text>
        <Text>
          The App may display, include or make available third-party content
          (including data, information, applications and other products
          services) or provide links to third-party websites or services
          ("Third-Party Services").
        </Text>
        <Text style={{ marginTop: 10 }}>
          You acknowledge and agree that we shall not be responsible for any
          Third-Party Services, including their accuracy, completeness,
          timeliness, validity, copyright compliance, legality, decency, quality
          or any other aspect thereof. We do not assume and shall not have any
          liability or responsibility to you or any other person or entity for
          any Third-Party Services.
        </Text>
        <Text style={{ marginTop: 10 }}>
          Third-Party Services and links thereto are provided solely as a
          convenience to you and you access and use them entirely at your own
          risk and subject to such third parties' terms and conditions.
        </Text>
        <Text style={styles.boldTitleMargin}>Privacy</Text>
        <Text>
          By using and accessing the App, you agree to the collection,
          retention, processing, and use of your information such as name,
          telephone number, e-mail address, age, subject, location, etc. which
          can be used to uniquely identify for the purpose of the services. We
          collect your information to provide you with the best customer
          experience possible. We intended to protect your information from
          being intercepted, accessed, used, or disclosed by unauthorized
          persons. Your information may also be accessible to the third parties
          during the usage of App and we will not be responsible if your
          confidential information becomes accessible to third parties during
          the usage of App.
        </Text>
        <Text style={{ marginTop: 10 }}>
          We will not be liable if your data, process, documents, etc. partly or
          fully distorted or lost and it is your own discretion to prevent
          access to your device for any misuse outside or within the
          organization. If you do not wish to have your data processed, then you
          must not use the App.
        </Text>
        <Text style={styles.boldTitleMargin}>Term & Termination</Text>
        <Text>
          • This Agreement shall remain in effect until terminated by you or us.
        </Text>
        <Text>
          • We may, in our sole discretion, at any time and for any or no
          reason, suspend or terminate this Agreement with or without prior
          notice.
        </Text>
        <Text>
          • This Agreement will be terminated immediately, without prior notice
          from us, in the event that you fail to comply with any provision of
          this Agreement. You may also terminate this Agreement by deleting the
          App and all copies thereof from your electronic devices.
        </Text>
        <Text>
          • Upon termination of this Agreement, you shall cease all use of the
          Application and delete all copies of the Application from your
          devices.
        </Text>
        <Text>
          • Termination of this Agreement will not limit any of our rights or
          remedies at law or in equity in case of breach by you (during the term
          of this Agreement) of any of your obligations under the present
          Agreement.
        </Text>
        <Text style={styles.boldTitleMargin}>Entire Agreement</Text>
        <Text>
          The Agreement constitutes the entire agreement between you and us
          regarding your use of the App and supersedes all prior and
          contemporaneous written or oral agreements between you and us. You may
          be subject to additional terms and conditions that apply when you use
          or purchase our other services, which we will provide to you at the
          time of such use or purchase.
        </Text>
        <Text style={styles.boldTitleMargin}>Prohibited Behavior</Text>
        <Text>
          You agree to use the App solely for your own lawful personal or
          business needs. You are responsible for all content, including
          photographs, images, video and audio content that you transmit,
          disclose, disseminate or otherwise distribute, or content that you
          elicit and/or collect and/or store using the Application
          (collectively, "User Content") and you shall not take any unlawful or
          improper actions with respect to such User Content in our violation or
          any third parties' rights or applicable laws. You agree not to use the
          App to engage in any of the Prohibited Behavior. The content
          transmitted or distributed through the App may not be appropriate or
          satisfactory for your use, and you should verify all content before
          relying on it.
        </Text>
        <Text style={styles.boldTitleMargin}>Passwords</Text>
        <Text>
          To protect your personal information, access to the App requires
          submission of login and password information to create a user Account.
          The login and password are for your personal use only and are not
          transferable. You may not share your login or password with any other
          individual. You agree that you will be responsible for maintaining
          your password as confidential and for any activity that occurs as a
          result of your enabling or permitting another person or entity to use
          your password. You agree to immediately notify us in the event that:
          (i) your password is lost or stolen; or (ii) you become aware of any
          unauthorized use of your password or of any other breach of security
          related to the App. We are not responsible for any loss or damage
          arising from your failure to comply with the provisions of this
          section.
        </Text>
        <Text style={styles.boldTitleMargin}>Governing Law</Text>
        <Text>
          The laws of
          <Text style={{ fontWeight: "bold" }}>the United Kingdom</Text>,
          excluding its conflicts of law rules, shall govern this Agreement and
          your use of the App. Your use of the App may also be subject to your
          local, state, national, or international laws.
        </Text>
        <Text style={styles.boldTitleMargin}>Dispute Resolution</Text>
        <Text>
          User shall first contact with us regarding any claim or controversy
          arising out of or relating to this EULA, or any breach thereof. In the
          event such claim or controversy cannot be resolved informally, User
          and we agree to try in good faith to settle the dispute by mediation
          under the Arbitration Laws, before resorting to arbitration. Any claim
          or controversy arising out of or relating to this EULA, or any breach
          thereof, except such claims or controversies for which injunctive
          relief is available, that cannot be resolved by mediation within 30
          days shall be finally settled by arbitration administered by the
          Authority in accordance with its Commercial Arbitration Rules
          including the Supplementary Procedures for Consumer-Related Disputes
          and judgment on the award rendered by the arbitrator(s) may be entered
          in any court having jurisdiction thereof.
        </Text>
        <Text style={styles.boldTitleMargin}>Liabilities Disclaimer</Text>
        <Text>
          NEITHER WE NOR ANY OF OUR LICENSORS, AGENTS OR CONTRACTORS IN
          CONNECTION WITH THE APP SHALL BE LIABLE FOR ANY DIRECT, INDIRECT,
          SPECIAL, INCIDENTAL, EXEMPLARY, CONSEQUENTIAL, OR PUNITIVE DAMAGES OF
          ANY KIND (INCLUDING, WITHOUT LIMITATION, FOR ANY LOSS OF DATA,
          INTERRUPTION, DEVICE FAILURE OR PECUNIARY LOSS) ARISING OUT OF THE USE
          OR INABILITY TO USE THE APP WHETHER BASED ON WARRANTY, CONTRACT, TORT
          (INCLUDING NEGLIGENCE) OR ANY OTHER LEGAL THEORY AND WHETHER OR NOT
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. YOU UNDERSTAND AND
          ACKNOWLEDGE THAT YOUR SOLE AND EXCLUSIVE REMEDY WITH RESPECT TO ANY
          DEFECT IN OR DISSATISFACTION WITH THE APP IS TO DE-INSTALL AND CEASE
          TO USE THE APP. YOU MAY USE THE APP WITHIN THE LIMITATIONS OF YOUR
          DEVICE SPECIFICATIONS. WE WILL NOT BE LIABLE IF THE APP CAUSES HW
          PROBLEMS LIKE DEGREDATION, HEATING, PARTLY OF FULLY DAMAGE (AND OTHER
          HET RELATED PROBLEMS OCCURE LIKE FIRE ETC.). THIS APP IS NOT DESIGNED
          FOR USE WITH UNAUTHORIZED SOFTWARE, SERVICES, OR DEVICES OR
          NON-LICENSED ACCESSORIES, AND YOU MAY NOT USE ANY OF THESE WITH THIS
          APP. SUCH USE MAY BE ILLEGAL, AND IS A BREACH OF THIS AGREEMENT. SUCH
          USE MAY ALSO LEAD TO INJURY TO YOU OR OTHERS OR CAUSE PERFORMANCE
          ISSUES OR DAMAGE TO YOUR DEVICE.
        </Text>
        <Text style={styles.boldTitleMargin}>Amendments to this Agreement</Text>
        <Text>
          We reserve the right, at our sole discretion, to change, alter, modify
          or replace this Agreement at any time. If a revision is material we
          will provide at least 10 days' notice prior to any new terms taking
          effect. What constitutes a material change will be determined at our
          sole discretion.
        </Text>
        <Text style={{ marginTop: 10 }}>
          By continuing to access or use our App after any revisions become
          effective, you agree to be bound by the revised terms. If you do not
          agree to the new terms, you are no longer authorized to use the App.
        </Text>
        <Text style={styles.boldTitleMargin}>
          You acknowledge that you have read this EULA and understand the
          rights, obligations, terms and conditions set forth herein. By
          continuing to install the application, you consent to be bound by this
          EULA.
        </Text>
        <Text style={{ marginTop: 20 }}>Last updated: April 1, 2018</Text>
        <View style={{ justifyContent: "space-around", flexDirection: "row" }}>
          <Button transparent primary onPress={handleDecline}>
            <Text style={{ fontWeight: "bold" }}>{`${I18n.t(
              "eula.decline"
              )}`}
            </Text>
          </Button>
          <Button transparent primary onPress={handleAccept}>
            <Text style={{ fontWeight: "bold" }}>
              {`${I18n.t('eula.accept')}`}{' '}
            </Text>
          </Button>
        </View>
      </Content>
    </Container>
  </Modal>
);

const styles = StyleSheet.create({
  boldTitle: {
    ...primaryFont,
  },
  boldTitleMargin: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  modalContent: {
    backgroundColor,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
