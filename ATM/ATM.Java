/* Author : Samik Pandit
 * Date : 05-10-2022
 */
import java.util.*;

public class ATM {
    public static void main(String[] args) {
        Scanner lta = new Scanner(System.in);
        double balance = 0;
        double withdraw;
        double deposit;
        while (true){
            System.out.println("ATM");
            System.out.println("1. Withdraw");
            System.out.println("2. Deposit");
            System.out.println("3. Check Balance");
            System.out.println("4. Exit");
            System.out.print("Enter your choice :");
            int ch = lta.nextInt();
            switch (ch) {
                case 1 -> {
                    System.out.print("Enter money to be withdrawn:");
                    withdraw = lta.nextInt();
                    if (balance >= withdraw) {
                        balance = balance - withdraw;
                        System.out.println("Money : " + withdraw);
                    } else {
                        System.out.println("Insufficient balance,deposit amount to get withdrawn.");
                    }
                    System.out.println("");
                }
                case 2 -> {
                    System.out.print("Enter money to be deposited:");
                    deposit = lta.nextInt();
                    balance = balance + deposit;
                    System.out.println("Money deposited successfully." + deposit);
                    System.out.println("");
                }
                case 3 -> {
                    System.out.println("Current balance : " + balance);
                    System.out.println("");
                }
                case 4 -> System.exit(0);
                case 5 -> System.out.println("Wrong Choice !");
            }
        }
    }
}
