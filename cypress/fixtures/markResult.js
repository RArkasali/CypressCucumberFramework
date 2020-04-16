const exec = required('child_process').exec;
const args = '-H "Content-Type: multipart/form-data" -u helen:fr33l4nc3r!! -F "file=@test-results.xml" https://jira.obsidiandemo.com/rest/raven/1.0/import/execution/junit?projectKey=MDADISREC';
exec('curl ' + args, function  (error, stdout, stderr){
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
    
});