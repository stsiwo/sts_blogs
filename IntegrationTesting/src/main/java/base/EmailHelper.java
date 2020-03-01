package main.java.base;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Properties;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

import javax.mail.Address;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.NoSuchProviderException;
import javax.mail.Part;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.Message.RecipientType;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

public class EmailHelper {

  public static synchronized String getResetPasswordUrl(String targetEmail) {
    try {
      String host = "pop3.mailtrap.io";// change accordingly
      //String mailStoreType = "pop3";
      String username = "5244e5849cd557";// change accordingly
      String password = "ae85263ac17328";

      // create properties field
      Properties properties = new Properties();

      properties.put("mail.pop3.host", host);
      properties.put("mail.pop3.port", "1100");
      // properties.put("mail.pop3.starttls.enable", "true");
      Session emailSession = Session.getDefaultInstance(properties);

      // create the POP3 store object and connect with the pop server
      // mailtrap below
      Store store = emailSession.getStore("pop3");
      // gmail below
      // Store store = emailSession.getStore("pop3s");

      store.connect(host, username, password);

      // create the folder object and open it
      Folder emailFolder = store.getFolder("INBOX");
      emailFolder.open(Folder.READ_ONLY);

      BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

      // retrieve the messages from the folder in an array and print it
      Message[] messages = emailFolder.getMessages();
      System.out.println("messages.length---" + messages.length);

      for (int i = 0, n = messages.length; i < n; i++) {
        Message message = messages[i];

        if (message.getSentDate().after(new Date(System.currentTimeMillis() - 216000 * 1000))) {
          System.out.println("passed date filter");
          if (message.getSubject().toString().contains("Your Password Reset Request")) {
            System.out.println("passed user email filter");
            boolean isTargetRecipient = false;
            Address[] a = message.getRecipients(Message.RecipientType.TO);
            for (int j = 0; j < a.length; j++) {
              if (a[j].toString().contains(targetEmail)) {
                isTargetRecipient = true;
              } 
            }
            if (isTargetRecipient) {
                StringBuilder targetUrl = new StringBuilder("");
                extractTargetResetPasswordUrl(message, targetUrl);
                System.out.println("-----------------------------------");
                System.out.println(targetUrl.toString());
                String line = reader.readLine();
                if ("YES".equals(line)) {
                   message.writeTo(System.out);
                } else if ("QUIT".equals(line)) {
                   break;
                }
                return targetUrl.toString();
            }
          }
        }
      }
      // close the store and folder objects
      emailFolder.close(false);
      store.close();

    } catch (NoSuchProviderException e) {
      e.printStackTrace();
    } catch (MessagingException e) {
      e.printStackTrace();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  /*
   * This method checks for content-type based on which, it processes and fetches
   * the content of the message
   */
  public static synchronized void extractTargetResetPasswordUrl(Part p, StringBuilder targetUrl) throws Exception {
    if (p instanceof Message)
      // Call methos writeEnvelope
      writeEnvelope((Message) p);

    System.out.println("----------------------------");
    System.out.println("CONTENT-TYPE: " + p.getContentType());

    // check if the content is plain text
    if (p.isMimeType("text/plain")) {
      System.out.println("This is plain text");
      System.out.println("---------------------------");
      System.out.println((String) p.getContent());
    }
    // check if the content has attachment
    else if (p.isMimeType("multipart/*")) {
      System.out.println("This is a Multipart");
      System.out.println("---------------------------");
      Multipart mp = (Multipart) p.getContent();
      int count = mp.getCount();
      for (int i = 0; i < count; i++)
        extractTargetResetPasswordUrl(mp.getBodyPart(i), targetUrl);
    }
    // check if the content is a nested message
    else if (p.isMimeType("message/rfc822")) {
      System.out.println("This is a Nested Message");
      System.out.println("---------------------------");
      extractTargetResetPasswordUrl((Part) p.getContent(), targetUrl);
    } else {
      Object o = p.getContent();
      if (o instanceof String) {
        System.out.println("This is a string");
        System.out.println("---------------------------");
        System.out.println((String) o);
        Pattern pattern = Pattern.compile("\\<a\\ href=\"(.*)\"\\ >Reset\\ My\\ Password");
        Matcher matcher = pattern.matcher(((String) o));
        if (matcher.find()) {
          targetUrl.append(matcher.group(1));
        }
      } else if (o instanceof InputStream) {
        System.out.println("This is just an input stream");
        System.out.println("---------------------------");
        InputStream is = (InputStream) o;
        is = (InputStream) o;
        int c;
        while ((c = is.read()) != -1)
          System.out.write(c);
      } else {
        System.out.println("This is an unknown type");
        System.out.println("---------------------------");
        System.out.println(o.toString());
      }
    }
  }

  /*
   * This method would print FROM,TO and SUBJECT of the message
   */
  public static synchronized void writeEnvelope(Message m) throws Exception {
    System.out.println("This is the message envelope");
    System.out.println("---------------------------");
    Address[] a;

    // FROM
    if ((a = m.getFrom()) != null) {
      for (int j = 0; j < a.length; j++)
        System.out.println("FROM: " + a[j].toString());
    }

    // TO
    if ((a = m.getRecipients(Message.RecipientType.TO)) != null) {
      for (int j = 0; j < a.length; j++)
        System.out.println("TO: " + a[j].toString());
    }

    // SUBJECT
    if (m.getSubject() != null)
      System.out.println("SUBJECT: " + m.getSubject());

    // Date
    if (m.getSentDate() != null) {
      DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      System.out.println("Date: " + df.format(m.getSentDate()));
      System.out.println("Current Date: " + df.format(new Date()));
    }
  }

}
