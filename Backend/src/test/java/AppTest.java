import com.ex.App;
import com.ex.Main;
import com.ex.model.Request;
import com.ex.model.User;
import com.ex.service.IRequestService;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;


public class AppTest {
    static App app;
    static User user;
    static Request request;
    @BeforeClass
    public static void Start() {
        app = new App();
        IRequestService requestService = (IRequestService) app.getContext().get("RequestService");
        user = new User();
        request = new Request();
    }

    @Test
    public void testRunApp() {
        app.run();
    }

    @Test
    public void testUser() {
        user = new User(
                "Endeavorrrr",
                "user1",
                "password",
                "employee");
        user.toString();
    }

    @Test
    public void testRequest() {
        request = new Request(
                "user333333",
                "School stuffs",
                1005.0);
        request = new Request(
                "user333333",
                "School stuffs",
                1005.0,
                "N/A",
                "Pending");

        request.toString();
    }

//    /**
//     * Should not return false but it is
//     */
//    @Test
//    public void testLogin_False() {
//        IEmployeeService employeeService = (IEmployeeService) app.getContext().get("EmployeeService");
//
//        String username = "user1";
//        String password = "user1";
//        Assert.assertFalse(employeeService.login(username, password));
//    }

    @Test
    public void testMain() {
        String[] args = new String[] {"arg1", "arg2", "arg3"};
        Main.main(args);
    }

}
