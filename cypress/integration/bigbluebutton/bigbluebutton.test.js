/// <reference types="cypress" />

describe("BigBlueButton end-to-end testing", () => {
  before(() => {
    cy.clearCookies();
  });

  it("configure BigBlueButton credential", () => {
    const url = "http://localhost:1337/bigbluebutton";
    const credentials = {
      url: "https://api.asyncweb.io/abf82346/bigbluebutton",
      secret: "516b4869c452ec7c3e6593045cade5690f0a1461",
    };
    cy.request({
      method: "POST",
      url: `${url}/verifyUrlAndSecret`,
      body: credentials,
    }).then((response) => {
      expect(response.body).to.have.property("returncode", "SUCCESS");
    });
    cy.request({
      method: "PUT",
      url: `${url}/updateSettings`,
      body: credentials,
    }).then((response) => {
      expect(response.body).to.have.property("ok", true);
    });
  });

  it("Create BigBlueButton class", () => {
    const url = "http://localhost:1337/bigbluebutton";
    const data = {
      className: "chemistry",
      moderatorAccessCode: 5904,
      viewerAccessCode: 6626,
      bbbSettings: {
        moderatorApproval: false,
        maxParticipants: 100,
        logoutURL: "https://higheredlab.com/",
        allowModsToUnmuteUsers: false,
        lockSettingsDisablePrivateChat: false,
        logo: "https://higheredlab.com/wp-content/uploads/hel.png",
        muteOnStart: false,
        "userdata-bbb_skip_check_audio": "false",
        "userdata-bbb_listen_only_mode": "true",
      },
    };
    cy.request({
      method: "POST",
      url: `${url}/class`,
      body: data,
    }).then((response) => {
      expect(response).to.have.property("status", 200);
    });
  });

  it("BigBlueButton Moderator start meeting,Viewer join meeting,End meeting", () => {
    const url = "http://localhost:1337/bigbluebutton";
    const slug = "chemistry";
    cy.request(`${url}/class/${slug}`).then((response) => {
      expect(response).to.have.property("status", 200);

      // create bigbluebutton meeting
      cy.request({
        method: "POST",
        url: `${url}/class/start/${response.body.uid}`,
        body: {
          moderatorName: "Moderator",
        },
      }).then((startResponse) => {
        expect(startResponse.body).to.have.property("joinURL");

        // Joining bigbluebutton meeting
        cy.request({
          method: "POST",
          url: `${url}/class/join/${response.body.uid}`,
          body: {
            viewerName: "Viewer",
          },
        }).then((joinResponse) => {
          expect(joinResponse.body).to.have.property("joinURL");
        });

        // end meeting
        cy.request({
          method: "POST",
          url: `${url}/class/end`,
          body: {
            meetingId: response.body.uid,
            meetingPassword: response.body.moderatorAccessCode,
          },
        }).then((endResponse) => {
          expect(endResponse.body).to.have.property(
            "messageKey",
            "sentEndMeetingRequest"
          );
        });
      });

      // Deleting bigbluebutton class

      cy.request({
        method: "DELETE",
        url: `${url}/class/${response.body.id}`,
      }).then((response) => {
        expect(response.body).to.have.property("message", "succuss");
      });
    });
  });
});
