This file is used to take a screenshot of mcdiff.

It begins with lots of whitespace so that line numbers look a bit more real.

Scroll to (near) the end of the file.






























































/* --------------------------------------------------------------------------------------------- */
/*** blah blah ***********************************************************************************/
/* --------------------------------------------------------------------------------------------- */


/* --------------------------------------------------------------------------------------------- */
/*** public functions ****************************************************************************/
/* --------------------------------------------------------------------------------------------- */

int
main (int argc, char *argv[])
{
    GError *mcerror = NULL;
    int exit_code = EXIT_FAILURE;
    const char *tmpdir = getenv ("TMPDIR");

    mc_global.run_from_parent_mc = !check_sid ();

    // We had LC_CTYPE before, LC_ALL includs LC_TYPE as well
#ifdef HAVE_SETLOCALE
    (void) setlocale (LC_ALL, "");
#endif
    (void) bindtextdomain (PACKAGE, LOCALEDIR);
    (void) textdomain (PACKAGE);

    printf (_ ("Hello World!\n"));

    // do this before args parsing
    str_init_strings (NULL);

    mc_setup_run_mode (argv);  // are we mc? editor? viewer? etc...

    if (!mc_args_parse (&argc, &argv, "mc", &mcerror))
    {
    startup_exit_falure:
        fprintf (stderr, _ ("Failed to run:\n%s\n"), mcerror->message);
        g_error_free (mcerror);
    startup_exit_ok:
        mc_shell_deinit ();
        str_uninit_strings ();
        return exit_code;
    }
