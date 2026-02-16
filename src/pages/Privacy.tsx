import PageLayout from "@/components/PageLayout";

const Privacy = () => {
  return (
    <PageLayout>
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">Legal</p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mt-4">Last updated: February 2026</p>
          </div>

          <div className="space-y-10 text-sm text-muted-foreground leading-relaxed font-sans">
            <section>
              <p>
                Thank you for visiting Luxury Courier Club (the "Site"). Your privacy is important to us. This Privacy Policy (the "Policy") describes the types of information that Luxury Courier Club ("LCC", "us", "we", or "our") may collect from you or that you may provide when you visit the Site and the products, features, materials, and services we offer (collectively with the Site, the "Services"). This Policy also describes our policies and procedures for collecting, using, maintaining, protecting, and disclosing that information.
              </p>
              <p className="mt-4">
                This Policy applies to information we collect on the Site and through your use of the Services generally (including when you register for an account), and through communications between you and the Site (including email and other electronic messages).
              </p>
              <p className="mt-4">
                This Policy does not apply to information collected by third parties, including any websites, services, and applications that you elect to access through the Services. It also does not apply to any information collected by Luxury Courier Club offline or through any other means, including any other website operated by us or any third party (including our affiliates and subsidiaries).
              </p>
              <p className="mt-4">
                Please review this Policy carefully. By accessing or using the Services (or by clicking on "accept" or "agree" to this Policy when prompted), you agree to the terms of this Policy on behalf of yourself or the entity or organization that you represent. If you do not agree to any term in this Policy, you should refrain from further use of our Services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">1. Age Requirement</h2>
              <p>
                The Services and its content are not intended for, nor directed at, individuals under the age of twenty-one (21). No one under the age of twenty-one (21) may provide any personal information to or on the Services. We do not knowingly collect any personally identifiable information from individuals under the age of twenty-one (21). If you are under the age of twenty-one (21), please do not attempt to use or register for the Services or send any information about yourself to us, including your name, address, telephone number, or email address. If it is determined that we have inadvertently collected or received personally identifiable information from someone under the age of twenty-one (21), we shall immediately take the necessary steps to ensure that such information is deleted from our system's database. If you are a parent or legal guardian and believe your child under the age of twenty-one (21) has provided us information, please contact us at{" "}
                <a href="mailto:admin@luxurycouriers.club" className="text-foreground underline">admin@luxurycouriers.club</a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">2. Changes to Our Privacy Policy</h2>
              <p>
                This Policy was last revised on the date noted at the top of this page. We may update this Policy from time to time. If we make material changes, we will post the updated Policy on this page and notify you of such changes by means of sending an email to the email address specified in your account, sending a message on the Services, or through a notice on the Site home page. Your continued use of the Services after we make changes is deemed to be acceptance of those changes, so please check the Policy periodically for updates.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">3. Information We Collect</h2>
              <p className="mb-4">We receive several types of information about you from various sources, including:</p>

              <h3 className="font-semibold text-foreground/80 mb-2">A. Information and Content You Give Us</h3>
              <p className="mb-2">We collect personal information that you knowingly choose to disclose. This may include:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><span className="text-foreground/80 font-medium">Personal Information.</span> Your name, address, email address, username, password, and any other information you directly provide us on or through the Services, including when you register or create an account.</li>
                <li><span className="text-foreground/80 font-medium">Email Correspondences.</span> Records and copies of your email messages together with your email address and our responses, if you choose to correspond with us through email.</li>
                <li><span className="text-foreground/80 font-medium">User Content.</span> Information or content you submit to be published or displayed on public areas of the Services or transmitted to other users. Your User Content is posted and transmitted at your own risk.</li>
                <li><span className="text-foreground/80 font-medium">Transaction Information.</span> Information about any purchase or transactions made on the Services, including payment information such as your credit or debit card number and other card information, billing, shipping, and contact details.</li>
              </ul>

              <h3 className="font-semibold text-foreground/80 mb-2">B. Information We Collect Automatically</h3>
              <p className="mb-2">We may use a variety of technologies to collect certain information about your equipment, browsing actions, and patterns whenever you interact with the Services, including:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><span className="text-foreground/80 font-medium">Activity Information.</span> Details of your visits to our Services, including the types of content you view or engage with, the features you use, and the time, frequency, and duration of your activities.</li>
                <li><span className="text-foreground/80 font-medium">Equipment Information.</span> Information about your computer and internet connection, including your operating system, IP address, browser type, and browser language.</li>
                <li><span className="text-foreground/80 font-medium">Location Information.</span> Information about the location of your device, including GPS location, for purposes of enhancing or facilitating the Services.</li>
              </ul>

              <h3 className="font-semibold text-foreground/80 mb-2">C. Cookies & Tracking Technologies</h3>
              <p className="mb-2">The technologies we use for automatic data collection may include cookies, web beacons, JavaScripts, entity tags, HTML5 local storage, and resettable device identifiers. This Policy does not cover the use of tracking technologies by third parties.</p>

              <h3 className="font-semibold text-foreground/80 mb-2">D. Information from Other Sources</h3>
              <p>We may receive information about you from other sources and add it to our account information. These sources may include online and offline data providers, publicly available sources, and service providers who provide us with information based on their relationship with you.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">4. How We Use Your Information</h2>
              <p className="mb-2">We may use the information we collect about you in a variety of ways, including to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide the Services and its content to you</li>
                <li>Respond to comments and questions, and provide customer service</li>
                <li>Fulfill any other purpose for which you provide such information</li>
                <li>Communicate with you about your transaction, order, purchase, account, or subscription</li>
                <li>Inform you about important changes to, or other news about, the Services</li>
                <li>Operate, maintain, improve, personalize, and analyze the Services</li>
                <li>Monitor and analyze trends, usage, and activities for marketing or advertising purposes</li>
                <li>Detect, prevent, or investigate security breaches, fraud, and other unauthorized or illegal activity</li>
                <li>Carry out our obligations and enforce our rights arising from any contracts entered into between you and us</li>
                <li>Send promotional communications, such as information about features, newsletters, offers, promotions, contests, and events</li>
                <li>Develop, test and improve new products or services</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">5. How We Share Your Information</h2>
              <p className="mb-4">We may disclose aggregated or anonymized information about our users without any restrictions. We will not share your personal information except in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="text-foreground/80 font-medium">With subsidiaries and affiliates</span> for business purposes including management and analysis, decision-making, and other business purposes.</li>
                <li><span className="text-foreground/80 font-medium">With service providers</span> that provide us with support services, such as payment processing, website hosting, email delivery, location mapping, product delivery, or analytics services, who are bound by contractual obligations to keep personal information confidential.</li>
                <li><span className="text-foreground/80 font-medium">In connection with a sale or transfer</span> of some or all of Luxury Courier Club's assets.</li>
                <li><span className="text-foreground/80 font-medium">When required by law</span> to comply with any court order, law, or legal process.</li>
                <li><span className="text-foreground/80 font-medium">To enforce our rights</span> including our Terms of Service and other agreements, including for billing and collection purposes.</li>
                <li><span className="text-foreground/80 font-medium">To protect lawful interests</span> if we believe disclosure will help us protect the rights, property, or safety of Luxury Courier Club, our users, partners, agents, and others.</li>
                <li><span className="text-foreground/80 font-medium">With your consent</span> to fulfill the purpose for which you provide the information.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">6. Your Choices</h2>
              <h3 className="font-semibold text-foreground/80 mb-2">Cookies & Tracking Technologies</h3>
              <p className="mb-4">You may be able to set your browser to reject cookies and certain other technologies by adjusting the appropriate settings in your browser. Each browser is different, but many common browsers have preferences that may be adjusted to allow you to either accept or reject cookies before they are set or installed.</p>

              <h3 className="font-semibold text-foreground/80 mb-2">Promotional Communications</h3>
              <p className="mb-4">If you do not wish to receive promotional communications from us, you can opt-out by following the opt-out instructions in the promotional emails we send you, modifying your user preferences in your account profile, or sending us an email stating your request. We may still send you transactional communications, including emails about your account or purchases.</p>

              <h3 className="font-semibold text-foreground/80 mb-2">Do Not Track Signals</h3>
              <p>Please note that we currently do not respond to Do Not Track browser settings.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">7. Accessing and Correcting Your Information</h2>
              <p>
                You may send us an email to request access to, correct, or remove any personal information that you have provided to us. You may also access, correct, or remove your personal information by logging into the Site and visiting your account profile page. We may not be able to delete your personal information except by also deleting your account. If you delete your User Content from the Services or your account, copies of your User Content may remain viewable in cached and archived pages.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">8. Legal Bases for Processing</h2>
              <p className="mb-2">We may process personal information under the following conditions:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><span className="text-foreground/80 font-medium">Consent:</span> You have given your consent for processing personal information for one or more specific purposes.</li>
                <li><span className="text-foreground/80 font-medium">Performance of a contract:</span> Provision of personal information is necessary for the performance of an agreement with you.</li>
                <li><span className="text-foreground/80 font-medium">Legal obligations:</span> Processing personal information is necessary for compliance with a legal obligation.</li>
                <li><span className="text-foreground/80 font-medium">Vital interests:</span> Processing is necessary to protect your vital interests or those of another natural person.</li>
                <li><span className="text-foreground/80 font-medium">Legitimate interests:</span> Processing is necessary for the purposes of the legitimate interests pursued by Luxury Courier Club.</li>
              </ul>

              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to your personal information</li>
                <li>Request correction of incomplete or inaccurate information</li>
                <li>Object to processing of your personal information</li>
                <li>Request erasure of your personal information</li>
                <li>Request the transfer of your personal information</li>
                <li>Withdraw your consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">9. California Privacy Rights</h2>
              <p>
                If you are a California resident, California law may provide you with additional rights regarding our use of your personal information. To learn more about your California privacy rights, please submit a written request to{" "}
                <a href="mailto:admin@luxurycouriers.club" className="text-foreground underline">admin@luxurycouriers.club</a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">10. How We Protect Your Information</h2>
              <p className="mb-4">
                We take reasonable precautions to secure your personal information. We have implemented technical, physical, and administrative security measures designed to reduce the risk of loss, misuse, unauthorized access, disclosure, or modification of your information. All information you provide to us is stored on secure servers behind firewalls. When you transmit highly sensitive information (such as a credit card number) through the Services, we encrypt the transmission of that information using Secure Sockets Layer (SSL) technology.
              </p>
              <p>
                The safety and security of your information also depend on you. Where we have given you (or where you have chosen) a password for access to certain parts of the Services, you are responsible for keeping this password confidential. While we have employed security technologies and procedures to assist safeguarding your personal information, no system or network can be guaranteed to be 100% secure. Any transmission of personal information is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">11. Terms of Service</h2>
              <p>
                If you choose to visit the Services, your visit and any dispute over privacy is subject to this Policy and our{" "}
                <a href="/terms" className="text-foreground underline">Terms of Service</a>, including limitations on damages, resolution of disputes, and application of applicable law.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">12. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:admin@luxurycouriers.club" className="text-foreground underline">admin@luxurycouriers.club</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Privacy;
